import React, { useState } from 'react';
import { ethers } from 'ethers';
import VotingContract from './contracts/VotingSystem.json'; // ABI

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function Vote() {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [message, setMessage] = useState("");

  const handleVote = async () => {
    if (selectedProposal === null) {
      setMessage("Please select a proposal to vote.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, VotingContract.abi, signer);

      // Execute the vote function
      await contract.vote(selectedProposal);

      setMessage("Vote cast successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to cast vote.");
    }
  };

  return (
    <div>
      <h2>Vote for a Proposal</h2>
      <div>
        <label>
          Select Proposal ID:
          <input
            type="number"
            value={selectedProposal || ''}
            onChange={(e) => setSelectedProposal(e.target.value)}
            min="0"
          />
        </label>
        <button onClick={handleVote}>Vote</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Vote;

