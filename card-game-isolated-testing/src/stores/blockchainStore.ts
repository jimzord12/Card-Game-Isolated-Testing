// src/store/index.ts
import type { Contract, HDNodeWallet, Wallet } from "ethers";
import { create } from "zustand";

interface BlockchainStoreState {
  localWallet: HDNodeWallet | Wallet | null;
  rewardingToolContract: Contract | null;
  gameContract: Contract | null;
  setLocalWallet: (wallet: HDNodeWallet | Wallet | null) => void;
  setRewardingToolContract: (contract: Contract) => void;
  setGameContract: (contract: Contract) => void;
}

export const useBlockchainStore = create<BlockchainStoreState>((set) => ({
  gameContract: null,
  setGameContract: (contract: Contract) => set({ gameContract: contract }),

  rewardingToolContract: null,
  setRewardingToolContract: (contract: Contract) =>
    set({ rewardingToolContract: contract }),

  localWallet: null,
  setLocalWallet: (wallet: HDNodeWallet | Wallet | null) =>
    set({ localWallet: wallet }),
}));
