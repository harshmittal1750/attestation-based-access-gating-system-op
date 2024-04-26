import Image from "next/image";
import { Inter } from "next/font/google";
import { ConnectKitButton } from "connectkit";
// import Account from "@/components/Account";
import dynamic from "next/dynamic";
const Account = dynamic(() => import("../components/Account"), { ssr: false }); // prevent hydration

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <ConnectKitButton />
      <Account />
    </main>
  );
}
