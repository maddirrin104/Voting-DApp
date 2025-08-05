pragma solidity ^0.8.28;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }   

    address public owner;

    // map id ứng viên với struct 
    mapping(uint => Candidate) public candidates;

    uint public candidatesCount;
    mapping(address => bool) public hasVoted;

    constructor(string[] memory candidateNames) {
        owner = msg.sender;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates[i] = Candidate(candidateNames[i], 0);
            candidatesCount++;
        }
    }

    function vote(uint candidateId) public {
        require(!hasVoted[msg.sender], "You have voted this candidate!");
        require(candidateId < candidatesCount, "Not exist this candidate!");

        //xác nhận người gọi hàm (người vote) đã vote
        hasVoted[msg.sender] = true;
        candidates[candidateId].voteCount++;
    }

    function getCandidate(uint candidateId) public view returns (string memory, uint) {
        require(candidateId < candidatesCount, "Not exist this candidate!");
        Candidate memory candidate = candidates[candidateId];
        
        return (candidate.name, candidate.voteCount);
    }

}
