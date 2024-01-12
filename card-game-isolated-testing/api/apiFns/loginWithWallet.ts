import axiosPublic from "../apiConfig";
import { isValidWalletAddress } from "../../src/utils";

const loginWithWallet = async (walletAddress: string | null) => {
  console.log("🚀 Trying to: [POST] -> (Login) with Wallet: ", walletAddress);

  if (
    walletAddress == null ||
    walletAddress == "" ||
    walletAddress == undefined
  ) {
    throw new Error(
      "⛔ - Customer Error: walletAddress is null, empty, or undefined \n Origin: loginWithWallet() \n File: apiFns.ts"
    );
  }

  if (isValidWalletAddress(walletAddress) == false) {
    throw new Error(
      "⛔ - Customer Error: walletAddress is invalid \n Origin: loginWithWallet() \n File: apiFns.ts"
    );
  }

  const response = await axiosPublic.post(`authNoPwd`, {
    walletAddress: walletAddress,
  });

  return response.data;
};

export default loginWithWallet;
