const { expect } = require("chai");

describe("Voting", function () {
  it("Should allow a user to vote", async function () {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(["Alice", "Bob"]);
    await voting.waitForDeployment();

    await voting.vote(0);
    const candidate = await voting.getCandidate(0);
    expect(candidate[1]).to.equal(1n);
  });
});
