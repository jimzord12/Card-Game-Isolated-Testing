// src/store/index.ts
import type { Contract, HDNodeWallet, Wallet } from "ethers";
import { create } from "zustand";
import type { BaseContract } from "ethers";

export interface GameContract extends BaseContract {
  unsellCard: (cardId: number) => Promise<void>;
  createCard: (id: number, templateId: number) => Promise<void>;
  createPlayer: (name: string, id: number) => Promise<void>;
  depositCard: (cardId: number) => Promise<void>;
}

interface BlockchainStoreState {
  localWallet: HDNodeWallet | Wallet | null;
  rewardingToolContract: Contract | null;
  gameContract: GameContract | null;
  setLocalWallet: (wallet: HDNodeWallet | Wallet | null) => void;
  setRewardingToolContract: (contract: Contract) => void;
  setGameContract: (contract: BaseContract) => void;
}

export const useBlockchainStore = create<BlockchainStoreState>((set) => ({
  gameContract: null,
  setGameContract: (contract: BaseContract) =>
    set({ gameContract: contract as GameContract }),

  rewardingToolContract: null,
  setRewardingToolContract: (contract: Contract) =>
    set({ rewardingToolContract: contract }),

  localWallet: null,
  setLocalWallet: (wallet: HDNodeWallet | Wallet | null) =>
    set({ localWallet: wallet }),
}));
