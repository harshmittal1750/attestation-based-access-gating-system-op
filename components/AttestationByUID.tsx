import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ATTESTATION_BY_UID } from "@/lib/queries";

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
    <div className="">
      <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
        <input
          id="uid"
          type="text"
          value={uid}
          onChange={handleInputChange}
          placeholder="Enter UID to fetch"
          className="flex-1 p-2 border rounded shadow"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fetch Attestation
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-red-500">
          Error fetching attestation: {error.message}
        </p>
      )}

      {data && data.attestation && (
        <div className="p-4 border rounded shadow">
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
