import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ATTESTATIONS_FOR_RECIPIENT } from "../lib/queries";

interface Props {
  recipientAddress: string;
}

interface Attestation {
  id: string;
  attester: string;
  recipient: string;
  refUID: string;
  revocable: boolean;
  revocationTime: number | null;
  expirationTime: number | null;
  data: string;
}

export const Attestations: React.FC<Props> = ({ recipientAddress }) => {
  const { loading, error, data } = useQuery<{ attestations: Attestation[] }>(
    GET_ATTESTATIONS_FOR_RECIPIENT,
    { variables: { recipientAddress } }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Attestations for: {recipientAddress}</h2>
      {data && data.attestations.length > 0 ? (
        <ul>
          {data.attestations.map((attestation) => (
            <li key={attestation.id}>
              <strong>ID:</strong> {attestation.id}
              <br />
              <strong>Attester:</strong> {attestation.attester}
              <br />
              <strong>Recipient:</strong> {attestation.recipient}
              <br />
              <strong>Reference UID:</strong> {attestation.refUID}
              <br />
              <strong>Revocable:</strong> {attestation.revocable.toString()}
              {attestation.revocationTime && (
                <span>
                  <br />
                  <strong>Revocation Time:</strong> {attestation.revocationTime}
                </span>
              )}
              {attestation.expirationTime && (
                <span>
                  <br />
                  <strong>Expiration Time:</strong> {attestation.expirationTime}
                </span>
              )}
              <strong>Data:</strong> {attestation.data}
              <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No attestations found for {recipientAddress}</p>
      )}
    </div>
  );
};
