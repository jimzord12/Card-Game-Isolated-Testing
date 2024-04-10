import { ethers } from "ethers";
import type { HDNodeWallet, Wallet } from "ethers";
import { useState } from "react";

import {
  RewardingABI,
  contractRewardingAddress,
} from "../../constants/blockchain/contractDetails/rewardingTool";

export function useRewardingToolContract() {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @returns A Contract class instance that possess the blockchain functions as methods
   */
  const initialize = async (
    usesLocalWallet = false,
    localWallet: HDNodeWallet | Wallet | null = null
  ) => {
    // Using Local Wallet
    if (usesLocalWallet && localWallet) {
      setIsLoading(true);
      const provider = new ethers.JsonRpcProvider(
        "https://snf-34965.ok-kno.grnetcloud.net"
      );
      const connectedWallet = localWallet.connect(provider);
      const contractInstance = new ethers.Contract(
        contractRewardingAddress,
        RewardingABI,
        connectedWallet
      );
      setIsLoading(false);
      console.log(
        "useRewardingToolContract: (Local Wallet) The Contact: ",
        contractInstance
      );
      return contractInstance;

      // Using MetaMask Wallet
    } else if (
      contractRewardingAddress &&
      RewardingABI &&
      typeof window.ethereum !== "undefined"
    ) {
      setIsLoading(true);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          throw new Error("User is not connected to MetaMask");
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(
          contractRewardingAddress,
          RewardingABI,
          signer
        );
        setIsLoading(false);
        console.log(
          "useRewardingToolContract: (Metamask) The Contact: ",
          contractInstance
        );
        return contractInstance;
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to load contract", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      console.log(
        "⛔ - 🅱 Something unexpected went wrong while useGameContract: intialize was executing"
      );
    }
  };

  return { initialize, isLoading };
}
