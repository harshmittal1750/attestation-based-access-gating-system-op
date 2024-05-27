import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ATTESTATION_BY_UID } from "@/lib/queries";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const AttestationByUID: React.FC = () => {
  const [uid, setUid] = useState("");
  const { data, loading, error } = useQuery(GET_ATTESTATION_BY_UID, {
    variables: { UID: uid },
    skip: !uid, // This prevents the query from running until a UID is provided
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUid(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (uid) {
      // The query will automatically re-run when state changes due to Apollo's reactive variables
      console.log("Fetching data for UID:", uid);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div>
        e.g.0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e
      </div>
      <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
        <Input
          id="uid"
          type="text"
          value={uid}
          onChange={handleInputChange}
          placeholder="Enter UID to fetch"
          className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <Button type="submit">Fetch Attestation</Button>
      </form>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && (
        <p className="text-red-500 text-center">
          Error fetching attestation: {error.message}
        </p>
      )}

      {data && data.attestation && (
        <div className="p-4 border border-gray-300 rounded shadow-md mt-4">
          <h3 className="text-lg font-bold mb-2">Attestation Details:</h3>
          <p>
            <strong>ID:</strong> {data.attestation.id}
          </p>
          <p>
            <strong>Attester:</strong> {data.attestation.attester}
          </p>
          <p>
            <strong>Recipient:</strong> {data.attestation.recipient}
          </p>
          <p>
            <strong>Reference UID:</strong> {data.attestation.refUID}
          </p>
          <p>
            <strong>Revocable:</strong>{" "}
            {data.attestation.revocable ? "Yes" : "No"}
          </p>
          <p>
            <strong>Revocation Time:</strong> {data.attestation.revocationTime}
          </p>
          <p>
            <strong>Expiration Time:</strong> {data.attestation.expirationTime}
          </p>
          <p>
            <strong>Data:</strong> {data.attestation.data}
          </p>
        </div>
      )}
    </div>
  );
};

export default AttestationByUID;
