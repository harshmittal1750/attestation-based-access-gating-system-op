// zustand/useStore.ts

import { create } from "zustand";

interface State {
  address: string | undefined;
  isConnected: boolean;
  setAccountData: (address: string | undefined, isConnected: boolean) => void;
}

const useStore = create<State>((set) => ({
  address: undefined,
  isConnected: false,
  setAccountData: (address, isConnected) => set({ address, isConnected }),
}));

export default useStore;
