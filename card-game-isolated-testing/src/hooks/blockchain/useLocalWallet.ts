import { HDNodeWallet, Wallet, ethers } from "ethers";
import { useEffect, useState } from "react";
import { fetchUserDataWithWallet } from "../../../api/apiFns";
import { useAuth } from "../auth/useAuth";

function useLocalWallet() {
  const provider = new ethers.JsonRpcProvider(
    "https://snf-34965.ok-kno.grnetcloud.net"
  );

  const [wallet, setWallet] = useState<HDNodeWallet | Wallet | null>(null);
  const [balance, setBalance] = useState("-1");

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
          const userData = await fetchUserDataWithWallet(walletAddress);
          if (setUser === null)
            throw new Error("⛔ - useLocalWallet: setUser is null");
          setUser({ ...userData });
        } else {
          throw new Error("No Local Wallet was found");
        }
      } catch (error) {
        if (error?.response.status === 401) {
          console.log(
            "🔷 - Tried to Automatically Fetch User Data and Failed!"
          );
        } else {
          console.log(
            "🔷 - Automatic UserData Local Wallet Retrival Failed, probably no Wallet is stored."
          );
        }
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

  const retrieveWallet = () => {
    const privateKey = localStorage.getItem("walletPrivateKey");
    if (privateKey) {
      const existingWallet = new Wallet(privateKey);
      setWallet(existingWallet);
      return { walletAddress: existingWallet.address, success: true };
    } else {
      return { walletAddress: null, success: false };
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
    } else {
      throw new Error(
        "⛔ - UseLocalWallet Hook: wallet | provider is undefined"
      );
    }
  };

  return {
    wallet,
    deleteWallet,
    generateWallet,
    retrieveWallet,
    balance,
    getEthBalance,
    // connectWalletWithProvider,
  };
}

export default useLocalWallet;
