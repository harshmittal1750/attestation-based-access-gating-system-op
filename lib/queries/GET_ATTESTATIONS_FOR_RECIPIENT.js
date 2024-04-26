import { gql } from "@apollo/client";

export const GET_ATTESTATIONS_FOR_RECIPIENT = gql`
  query AttestationsForSpecificRecipient($recipientAddress: String!) {
    attestations(
      where: { recipient: { equals: $recipientAddress } }
      orderBy: { time: desc }
    ) {
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
