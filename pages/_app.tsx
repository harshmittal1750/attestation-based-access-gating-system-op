import { Web3Provider } from "@/components/Web3Provider";
import "@/styles/globals.css";
import client from "@/utils/appolo-client";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Web3Provider>
  );
}
