// src/hooks/useContract.js
import { useEffect, useState, useCallback } from "react";
import { ethers, JsonRpcSigner } from "ethers";
import contractABI from "@/lib/abi.json";
import { BigNumber } from "bignumber.js";

declare let window: any;

export const useContract = () => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

  const [ContractInstance, setContractInstance] = useState<any>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  useEffect(() => {
    const init = async () => {
      let signer = null;

      try {
        let provider;
        if (window.ethereum == null) {
          console.log("MetaMask not installed; using read-only defaults");
          provider = ethers.getDefaultProvider();
        } else {
          provider = new ethers.BrowserProvider(window.ethereum);
          signer = await provider.getSigner();
          await provider.send("eth_requestAccounts", []);
          setSigner(signer);
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setContractInstance(contract);
        }
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    init();
  }, []);

  const getProductCount = useCallback(async () => {
    if (ContractInstance) {
      const count = await ContractInstance.getProductCount();
      return new BigNumber(count);
    }
    return 0;
  }, [ContractInstance]);

  const getProduct = useCallback(
    async (productId: number) => {
      if (ContractInstance) {
        const product = await ContractInstance.getProduct(productId);
        return {
          id: new BigNumber(product[0]),
          name: product[1],
          companyName: product[2],
          description: product[3],
          email: product[4],

          featureCount: new BigNumber(product[5]),
        };
      }
      return null;
    },
    [ContractInstance]
  );

  const getFeature = useCallback(
    async (productId: number, featureId: number) => {
      if (ContractInstance) {
        const feature = await ContractInstance.getFeature(productId, featureId);
        return {
          id: Number(feature[0]),
          description: feature[1],
          requiredAttestations: feature[2].map((attestation: any) =>
            Number(attestation)
          ),
        };
      }
      return null;
    },
    [ContractInstance]
  );

  return { ContractInstance, signer, getProductCount, getProduct, getFeature };
};
