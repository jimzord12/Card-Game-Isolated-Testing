import { Eip1193Provider, ethers } from "ethers";

import detectEthereumProvider from "@metamask/detect-provider";

import { generaChain } from "../../constants/blockchain/chainConfig";
import { useCallback, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { formatBalance, formatChainAsNum } from "../../utils";
import { useToastError } from "../notifications";

const disconnectedState = { accounts: [], balance: "", chainId: -1 };

export const useMetamask = () => {
  const [ethersProvider, setEthersProvider] = useState<BrowserProvider | null>(
    null
  );
  const { showError } = useToastError();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [metamaskProvider, setMetamaskProvider] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");

  const [wallet, setWallet] = useState(disconnectedState);

  const getProvider = useCallback(async () => {
    const metamaskProvider = await detectEthereumProvider({ silent: false });
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
  }, []);

  const _updateWallet = useCallback(async () => {
    console.log(
      "🟢 [2] - Custom: useMetamask: _updateWallet: metamaskProvider: ",
      metamaskProvider
    );
    if (metamaskProvider === null) {
      showError("⛔ Metamask Error", "Metamask Provider is null");
      return null;
    }

    const accounts = await metamaskProvider.request({
      method: "eth_requestAccounts",
    });

    console.log(
      "🟢 [3] - Custom: useMetamask: _updateWallet: accounts: ",
      accounts
    );

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

      console.log(
        "🟢 [4] - Custom: useMetamask: _updateWallet: balance: ",
        balance
      );

      const chainId = formatChainAsNum(
        await metamaskProvider.request({
          method: "eth_chainId",
        })
      );

      console.log(
        "🟢 [5] - Custom: useMetamask: _updateWallet: chainId: ",
        chainId
      );

      setWallet({ accounts, balance, chainId });
    } catch (error) {
      console.error("⛔ Custom: Error while updating wallet", error);
      setErrorMessage("Error while updating wallet");
    }

    // return { accounts, balance, chainId };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metamaskProvider]);

  useEffect(() => {
    if (metamaskProvider !== null) {
      metamaskProvider.on("accountsChanged", _updateWallet);
      metamaskProvider.on("chainChanged", _updateWallet);
      // _updateWallet(); // 👈 Enable this for auto-wallet connection
    }
    getProvider();

    return () => {
      metamaskProvider?.removeListener("accountsChanged", () =>
        _updateWallet()
      );
      metamaskProvider?.removeListener("chainChanged", _updateWallet);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProvider, metamaskProvider]);

  // Handles switching to a different network.
  const switchNetwork = async () => {
    try {
      await metamaskProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: generaChain.chainId }],
      });
    } catch (switchError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((switchError as any).code === 4902) {
        console.error("⛔ This chain does not exist on Metamask.");
        throw new Error("This chain does not exist on Metamask");
        // await addNetwork();
        // await switchNetwork();
      } else {
        console.error("⛔ Custom: Eror while Switching Chains", switchError);
      }
    }
  };

  // Handles adding a new network.
  const addNetwork = async () => {
    const generaChainMetamaskData = { ...generaChain };
    delete generaChainMetamaskData.parsedChainId;
    try {
      await metamaskProvider.request({
        method: "wallet_addEthereumChain",
        params: [generaChainMetamaskData],
      });
    } catch (addError) {
      console.error(addError);
    }
  };

  const connectMetaMask = async () => {
    try {
      // const accounts = await metamaskProvider.request({
      //   method: "eth_requestAccounts",
      // });
      console.log(
        "🟢 [1] - Custom: useMetamask: connectMetaMask: trying to connect wallet"
      );
      clearError();
      _updateWallet();
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setErrorMessage((err as any).message);
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
