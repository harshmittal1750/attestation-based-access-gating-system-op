// components/Account.tsx
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import useStore from "@/zustand/useStore";

const Account: React.FC = () => {
  const { address, isConnected } = useAccount();
  const setAccountData = useStore((state) => state.setAccountData);

  useEffect(() => {
    setAccountData(address, isConnected);
  }, [address, isConnected, setAccountData]);

  return (
    <div suppressHydrationWarning>
      {isConnected && address ? (
        <div>Connected to: {address}</div>
      ) : (
        <div>Not connected</div>
      )}
    </div>
  );
};

export default Account;
