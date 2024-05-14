import React, { useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { getContract } from "@/utils/contract-helper";
import useStore from "@/zustand/useStore";

const AttestationManager = () => {
  const { address, isConnected, connector } = useAccount();
  const [attestationId, setAttestationId] = useState(0);
  const [attestationStatus, setAttestationStatus] = useState("");

  const performTransaction = async (action: "add" | "revoke", id: number) => {
    if (!isConnected || !address || !connector) return;
    try {
      // Create a signer

      const signer = await connector.getSigner();
      const contract = getContract(signer);

      // Perform the transaction based on the action type
      const tx = await (action === "add"
        ? contract.addAttestation(address, id)
        : contract.revokeAttestation(address, id));
      await tx.wait();
      setAttestationStatus(
        `Attestation ${action === "add" ? "added" : "revoked"} successfully.`
      );
    } catch (error) {
      console.error(
        `Error ${action === "add" ? "adding" : "revoking"} attestation:`,
        error
      );
      setAttestationStatus(
        `Failed to ${action === "add" ? "add" : "revoke"} attestation.`
      );
    }
  };

  return (
    <div>
      <input
        type="number"
        value={attestationId}
        onChange={(e) => setAttestationId(parseInt(e.target.value))}
        placeholder="Enter attestation ID"
      />
      <button onClick={() => performTransaction("add", attestationId)}>
        Add Attestation
      </button>
      <button onClick={() => performTransaction("revoke", attestationId)}>
        Revoke Attestation
      </button>
      <p>{attestationStatus}</p>
    </div>
  );
};

export default AttestationManager;
