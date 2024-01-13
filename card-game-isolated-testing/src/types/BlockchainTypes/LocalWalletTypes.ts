import { Wallet } from "ethers/wallet";

export interface ExtendedWallet extends Wallet {
  customTempMnemonic?: string;
}
