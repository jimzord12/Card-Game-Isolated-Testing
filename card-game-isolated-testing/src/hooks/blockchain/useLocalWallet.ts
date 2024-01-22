import { HDNodeWallet, Wallet, ethers } from "ethers";
import { useEffect, useState } from "react";
import { loginWithWallet } from "../../../api/apiFns";
import { useAuth } from "../auth/useAuth";
import { isValidWalletAddress } from "../../utils";

function useLocalWallet() {
  const provider = new ethers.JsonRpcProvider(
    "https://snf-34965.ok-kno.grnetcloud.net"
  );

  const [wallet, setWallet] = useState<HDNodeWallet | Wallet | null>(null);
  const [balance, setBalance] = useState("-1");
  const [setLW_HookHasRun, setSetLW_HookHasRun] = useState(false);

  const { setUser } = useAuth();

  useEffect(() => {
    async function automaticLogin() {
      try {
        const { success, walletAddress } = retrieveWallet();
        //TODO: Use the Wallet Address to get the User Data. Use an api funtion.
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
  }, []);

  const generateWallet = () => {
    const newWallet = Wallet.createRandom();
    localStorage.setItem("walletPrivateKey", newWallet.privateKey);
    console.log(
      "✨ New Local Wallet Created! Private Key: ",
      newWallet.privateKey
    );
    setWallet(newWallet);
  };

  const retrieveWallet = (walletAddress?: string) => {
    if (walletAddress) {
      if (isValidWalletAddress(walletAddress)) {
        const existingWallet = new Wallet(walletAddress);
        setWallet(existingWallet);
        return { walletAddress: existingWallet.address, success: true };
      }
      return { walletAddress: null, success: false };
    } else {
      const privateKey = localStorage.getItem("walletPrivateKey");
      if (privateKey) {
        const existingWallet = new Wallet(privateKey);
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
      const balanceEth = ethers.formatEther(balanceWei);
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
