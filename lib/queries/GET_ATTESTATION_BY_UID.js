import { gql } from "@apollo/client";

export const GET_ATTESTATION_BY_UID = gql`
  query Attestation($UID: String!) {
    attestation(where: { id: $UID }) {
      id
      attester
      recipient
      refUID
      revocable
      revocationTime
      expirationTime
      data
    }
  }
`;
