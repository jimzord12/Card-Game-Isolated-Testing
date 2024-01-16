import axiosPublic from "../../apiConfig";
import { isValidWalletAddress } from "../../../src/utils";
import { IPlayerDB } from "../../../src/types/PlayerTypes/Player";
import { ICardDB } from "../../../src/types";

interface ResponseData {
  player: IPlayerDB;
  cards: ICardDB[];
}

// #1 - Gets the Player's Data
const getPlayerByWallet = async (
  walletAddress: string | null
): Promise<ResponseData> => {
  console.log("🚀 Trying to: [GET] -> (Player) with Wallet: ", walletAddress);

  if (
    walletAddress == null ||
    walletAddress == "" ||
    walletAddress == undefined
  ) {
    throw new Error(
      "⛔ - Customer Error: walletAddress is null, empty, or undefined \n Origin: getPlayer() \n File: apiFns.ts"
    );
  }

  if (isValidWalletAddress(walletAddress) == false) {
    throw new Error(
      "⛔ - Customer Error: walletAddress is invalid \n Origin: getPlayer() \n File: apiFns.ts"
    );
  }

  const response = await axiosPublic.get(`/players/${walletAddress}`);

  console.log("🚀 [GET] ✅ -> (Player): ", response.data);

  return response.data;
};

export default getPlayerByWallet;
