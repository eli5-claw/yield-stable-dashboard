"use client";

import { createConfig, http } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [base, mainnet],
  connectors: [
    injected(),
  ],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
