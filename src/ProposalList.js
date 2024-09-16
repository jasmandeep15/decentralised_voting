import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VotingContract from './contracts/VotingSystem.json';  // ABI

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function ProposalList() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, VotingContract.abi, provider);
      const proposalCount = await contract.getProposalCount();
      
      let proposalsList = [];
      for (let i = 0; i < proposalCount; i++) {
        const proposal = await contract.proposals(i);
        proposalsList.push({ id: i, name: proposal[0], voteCount: proposal[1] });
      }
      setProposals(proposalsList);
    };
    fetchProposals();
  }, []);

  const vote = async (id) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, VotingContract.abi, signer);
    
    await contract.vote(id);
  };

  return (
    <div>
      <h2>Proposals</h2>
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal.id}>
            {proposal.name} - {proposal.voteCount} votes 
            <button onClick={() => vote(proposal.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProposalList;
