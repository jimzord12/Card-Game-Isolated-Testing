import { Eip1193Provider, ethers } from "ethers";

import detectEthereumProvider from "@metamask/detect-provider";

import { generaChain } from "../../constants/blockchain/chainConfig";
import { useCallback, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { formatBalance, formatChainAsNum } from "../../utils";

const disconnectedState = { accounts: [], balance: "", chainId: -1 };

export const useMetamask = () => {
  const [ethersProvider, setEthersProvider] = useState<BrowserProvider | null>(
    null
  );
  const [metamaskProvider, setMetamaskProvider] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");

  const [wallet, setWallet] = useState(disconnectedState);

  const getProvider = useCallback(async () => {
    if (window?.ethereum) {
      const metamaskProvider = await detectEthereumProvider({ silent: true });
      if (metamaskProvider) {
        setMetamaskProvider(metamaskProvider);
        const _ethersProvider = new ethers.BrowserProvider(
          metamaskProvider as unknown as Eip1193Provider
        );
        setEthersProvider(_ethersProvider);
      } else {
        setErrorMessage("Can not Create a ethers.js Provider from Metamask");
        console.log(
          "⛔ Custom: useMetamask: getProvider: metamaskProvider is null"
        );
      }
    } else {
      setErrorMessage("Please install MetaMask!");
    }
  }, []);

  const _updateWallet = useCallback(async () => {
    if (metamaskProvider === null) {
      return null;
    }

    const accounts = await metamaskProvider.request({ method: "eth_accounts" });

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState);
      return null;
    }

    // Retrieving User Balance
    try {
      const balance = formatBalance(
        await metamaskProvider.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })
      );

      const chainId = formatChainAsNum(
        await metamaskProvider.request({
          method: "eth_chainId",
        })
      );

      setWallet({ accounts, balance, chainId });
    } catch (error) {
      console.error("⛔ Custom: Error while updating wallet", error);
      setErrorMessage("Error while updating wallet");
    }

    // return { accounts, balance, chainId };
  }, [metamaskProvider]);

  useEffect(() => {
    if (metamaskProvider !== null) {
      metamaskProvider.on("accountsChanged", _updateWallet);
      metamaskProvider.on("chainChanged", _updateWallet);
      _updateWallet();
    }
    getProvider();

    return () => {
      metamaskProvider?.removeListener("accountsChanged", () =>
        _updateWallet()
      );
      metamaskProvider?.removeListener("chainChanged", _updateWallet);
    };
  }, [getProvider, metamaskProvider]);

  // Handles switching to a different network.
  const switchNetwork = async () => {
    try {
      await metamaskProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: generaChain.chainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        console.error("This chain does not exist.");
      } else {
        console.error("⛔ Custom: Eror while Switching Chains", switchError);
      }
    }
  };

  // Handles adding a new network.
  const addNetwork = async () => {
    try {
      await metamaskProvider.request({
        method: "wallet_addEthereumChain",
        params: [generaChain],
      });
    } catch (addError) {
      console.error(addError);
    }
  };

  const connectMetaMask = async () => {
    try {
      const accounts = await metamaskProvider.request({
        method: "eth_requestAccounts",
      });
      clearError();
      _updateWallet(accounts);
    } catch (err) {
      setErrorMessage(err.message);
      console.log("⛔ Custom: useMetamask: connectMetaMask: err", err);
    }
  };

  return {
    ethersProvider,
    metamaskProvider,
    errorMessage,
    wallet,
    getProvider,
    _updateWallet,
    switchNetwork,
    addNetwork,
    connectMetaMask,
  };
};
