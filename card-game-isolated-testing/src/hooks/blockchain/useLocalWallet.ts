import { Wallet } from "ethers";
import { JsonRpcProvider } from "ethers";
import { formatEther } from "ethers";
import type { HDNodeWallet } from "ethers";
import { useEffect, useState } from "react";
import { loginWithWallet } from "../../../api/apiFns";
import { useAuth } from "../auth/useAuth";
import { useBlockchainStore } from "../../stores/blockchainStore";

function useLocalWallet() {
  const provider = new JsonRpcProvider(
    "https://snf-34965.ok-kno.grnetcloud.net"
  );

  const [wallet, setWallet] = useState<HDNodeWallet | Wallet | null>(null);
  const [balance, setBalance] = useState("-1");
  const [setLW_HookHasRun, setSetLW_HookHasRun] = useState(false);

  const setLocalWallet = useBlockchainStore((state) => state.setLocalWallet);
  const { setUser } = useAuth();

  useEffect(() => {
    async function automaticLogin() {
      try {
        const { success, walletAddress } = retrieveWallet();
        if (success) {
          console.log(
            "✅ - Local Wallet Discovery Success. Retrieving User Data..."
          );
          const userData = await loginWithWallet(walletAddress);
          if (setUser === null)
            throw new Error("⛔ - useLocalWallet: setUser is null");
          setUser({ ...userData });
        } else {
          console.log("💥 - No Local Wallet was found");
        }
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any)?.response.status === 401) {
          console.log(
            "🔷 - Tried to Automatically Fetch User Data and Failed!"
          );
        } else {
          console.log(
            "🔷 - Automatic UserData Local Wallet Retrival Failed, probably no Wallet is stored."
          );
        }
      } finally {
        setSetLW_HookHasRun(true);
      }
    }

    automaticLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateWallet = () => {
    const newWallet = Wallet.createRandom();
    localStorage.setItem("walletPrivateKey", newWallet.privateKey);
    console.log(
      "✨ New Local Wallet Created! Private Key: ",
      newWallet.privateKey
    );
    setLocalWallet(newWallet);
    setWallet(newWallet);
  };

  const retrieveWallet = (privKryToRestore?: string | undefined) => {
    // console.log("useLocalWallet: retrieveWallet: ", walletAddress);
    if (privKryToRestore) {
      console.log("useLocalWallet: existingWallet: ", privKryToRestore);
      const existingWallet = new Wallet(privKryToRestore);
      localStorage.setItem("walletPrivateKey", existingWallet.privateKey);
      setLocalWallet(existingWallet);
      setWallet(existingWallet);

      return { walletAddress: existingWallet.address, success: true };
    } else {
      const privateKey = localStorage.getItem("walletPrivateKey");
      if (privateKey) {
        const existingWallet = new Wallet(privateKey);
        setLocalWallet(existingWallet);
        setWallet(existingWallet);
        return { walletAddress: existingWallet.address, success: true };
      } else {
        return { walletAddress: null, success: false };
      }
    }
  };
  const deleteWallet = () => {
    localStorage.removeItem("walletPrivateKey");
    setWallet(null);
  };

  //   const connectWalletWithProvider = async (provider) => {
  //     if (wallet && provider) {
  //       const connectedWallet = await wallet.connect(provider);
  //       setWallet(connectedWallet);
  //     }
  //   };

  const getEthBalance = async () => {
    if (wallet && provider) {
      const walletAddress = await wallet.getAddress();
      const balanceWei = await provider.getBalance(walletAddress);
      const balanceEth = formatEther(balanceWei);
      setBalance(balanceEth);
      return balanceEth;
    }
    // else {
    //   throw new Error(
    //     "⛔ - UseLocalWallet Hook: wallet | provider is undefined"
    //   );
    // }
  };

  return {
    wallet,
    deleteWallet,
    generateWallet,
    retrieveWallet,
    balance,
    getEthBalance,
    setLW_HookHasRun,
    // connectWalletWithProvider,
  };
}

export default useLocalWallet;
