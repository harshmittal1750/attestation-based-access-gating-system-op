import Image from "next/image";
import { Inter } from "next/font/google";
import { ConnectKitButton } from "connectkit";
import useStore from "@/zustand/useStore";
// import Account from "@/components/Account";
import dynamic from "next/dynamic";
import { Attestations } from "@/components/Attestations";
import AttestationByUID from "@/components/AttestationByUID";
const Account = dynamic(() => import("../components/Account"), { ssr: false }); // prevent hydration

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const recipientAddress = useStore((state) => state.address) || "";

  return (
    <main>
      <ConnectKitButton />
      <Account />
      <Attestations recipientAddress={recipientAddress} />
      <AttestationByUID />
    </main>
  );
}
