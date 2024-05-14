import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
const provider: any = ethers.providers.getDefaultProvider("sepolia");

const eas = new EAS(EASContractAddress);
eas.connect(provider);

export const getAttestation = async (uid: string) => {
  const attestation = await eas.getAttestation(uid);
  console.log(attestation, "attessts");
  return attestation;
};
