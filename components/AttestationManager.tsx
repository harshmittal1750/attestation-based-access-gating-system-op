import React, { useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
// import { getContract } from "@/utils/contract-helper";
import useStore from "@/zustand/useStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const AttestationManager = () => {
  const { address, isConnected, connector } = useAccount();
  const [attestationId, setAttestationId] = useState(0);
  const [attestationStatus, setAttestationStatus] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading status

  // const performTransaction = async (action: "add" | "revoke", id: number) => {
  //   if (!isConnected || !address || !connector || id <= 0) {
  //     setAttestationStatus("Please enter a valid attestation ID.");
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const signer = await connector.getProvider();
  //     const contract = getContract(signer);
  //     const tx = await (action === "add"
  //       ? contract.addAttestation(address, id)
  //       : contract.revokeAttestation(address, id));
  //     await tx.wait();
  //     setAttestationStatus(
  //       `Attestation ${action === "add" ? "added" : "revoked"} successfully.`
  //     );
  //   } catch (error) {
  //     console.error(
  //       `Error ${action === "add" ? "adding" : "revoking"} attestation:`,
  //       error
  //     );
  //     setAttestationStatus(
  //       `Failed to ${action === "add" ? "add" : "revoke"} attestation.`
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="p-4">
      <Input
        className="border p-2 rounded mr-2"
        type="number"
        min="1"
        value={attestationId}
        onChange={(e) => setAttestationId(parseInt(e.target.value, 10))}
        placeholder="Enter attestation ID"
      />
      <Button
        className=""
        // onClick={() => performTransaction("add", attestationId)}
        disabled={loading}
      >
        Add Attestation
      </Button>
      <Button
        className="bg-red-500 ml-2"
        // onClick={() => performTransaction("revoke", attestationId)}
        disabled={loading}
      >
        Revoke Attestation
      </Button>
      <p className="mt-2">{attestationStatus}</p>
    </div>
  );
};

export default AttestationManager;
