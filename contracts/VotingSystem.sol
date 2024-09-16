// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Proposal {
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    Proposal[] public proposals;

    constructor(string[] memory proposalNames) {
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function getProposalCount() public view returns (uint) {
        return proposals.length;
    }

    function vote(uint proposalIndex) public {
        require(!voters[msg.sender], "You have already voted.");
        voters[msg.sender] = true;
        proposals[proposalIndex].voteCount++;
    }

    function proposals(uint index) public view returns (string memory name, uint voteCount) {
        Proposal storage proposal = proposals[index];
        return (proposal.name, proposal.voteCount);
    }
}
