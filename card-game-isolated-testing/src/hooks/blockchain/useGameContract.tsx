import { ethers } from "ethers";
import type { HDNodeWallet, Wallet } from "ethers";
import { useState } from "react";

import {
  gameAddress,
  gameABI,
} from "../../constants/blockchain/contractDetails/game";

export function useGameContract() {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @returns A Contract class instance that possess the blockchain functions as methods
   */
  const initialize = async (
    usesLocalWallet = false,
    localWallet: HDNodeWallet | Wallet | null = null
  ) => {
    if (usesLocalWallet && localWallet) {
      setIsLoading(true);
      const provider = new ethers.JsonRpcProvider(
        "https://snf-34965.ok-kno.grnetcloud.net"
      );
      const connectedWallet = localWallet.connect(provider);
      const contractInstance = new ethers.Contract(
        gameAddress,
        gameABI,
        connectedWallet
      );
      setIsLoading(false);
      console.log(
        "UseGameContract: (Local Wallet) The Game Contact: ",
        contractInstance
      );
      return contractInstance;
    } else if (
      gameAddress &&
      gameABI &&
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
          gameAddress,
          gameABI,
          signer
        );
        setIsLoading(false);
        console.log(
          "UseGameContract: (Metamask) The Game Contact: ",
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
