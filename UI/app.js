// abi
const contractABI = [
    {
        "inputs": [{"internalType":"string[]","name":"candidateNames","type":"string[]"}],
        "stateMutability":"nonpayable",
        "type":"constructor"
    },
    {
        "inputs": [],
        "name": "candidatesCount",
        "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[{"internalType":"uint256","name":"candidateId","type":"uint256"}],
        "name":"getCandidate",
        "outputs":[
            {"internalType":"string","name":"","type":"string"},
            {"internalType":"uint256","name":"","type":"uint256"}
        ],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[{"internalType":"uint256","name":"candidateId","type":"uint256"}],
        "name":"vote",
        "outputs":[],
        "stateMutability":"nonpayable",
        "type":"function"
    }
];

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

let web3;
let contract;
let accounts = [];

// connecting metamask
document.getElementById("connectButton").addEventListener("click", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        accounts = await ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(contractABI, contractAddress);
        loadCandidates();
    } else {
        alert("Please install MetaMask!");
    }
});

// loading candidates
async function loadCandidates() {
    const count = await contract.methods.candidatesCount().call();
    const container = document.getElementById("candidates");
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.getCandidate(i).call();
        const div = document.createElement("div");
        div.className = "candidate";
        div.innerHTML = `
            <h3>${candidate[0]}</h3>
            <p>Votes: ${candidate[1]}</p>
            <button onclick="vote(${i})">Vote</button>
        `;
        container.appendChild(div);
    }
}

// voting
async function vote(id) {
    try {
        await contract.methods.vote(id).send({ from: accounts[0] });
        alert("Voted successfully!");
        loadCandidates();
    } catch (error) {
        alert("Error: " + error.message);
    }
}
