import { HDNodeWallet, Wallet, ethers } from "ethers";
import { useEffect, useState } from "react";

function useLocalWallet() {
  const provider = new ethers.JsonRpcProvider(
    "https://snf-34965.ok-kno.grnetcloud.net"
  );

  const [wallet, setWallet] = useState<HDNodeWallet | Wallet | null>(null);
  const [balance, setBalance] = useState("-1");
  const [hasLocalWalletHookRun, setHasLocalWalletHookRun] = useState(false);

  useEffect(() => {
    try {
      const success = retrieveWallet();
      if (success) //TODO: Use the Wallet Address to get the User Data. Use an api funtion.
    } catch (error) {
      console.log(
        "🔷 - Automatic Local Wallet Retrival Failed, probably no Wallet is stored."
      );
    }
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
      setHasLocalWalletHookRun(true);
      return true;
    } else {
      setHasLocalWalletHookRun(true);

      throw new Error("No Local Wallet was found");
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
    hasLocalWalletHookRun,
  };
}

export default useLocalWallet;
