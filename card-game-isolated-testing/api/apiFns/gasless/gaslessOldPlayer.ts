import axios from "../../apiConfig";
import { ethers } from "ethers";

const GIVE_ETH_OLD_PLAYER = "gasless/login";

interface ResponseData {
  message: string;
  tx: ethers.TransactionResponse;
}

export const gaslessOldPlayer = async (
  walletAddress: string
): Promise<ResponseData> => {
  const gaslessResponse = await axios.post(
    GIVE_ETH_OLD_PLAYER,
    JSON.stringify({ address: walletAddress }),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return { message: gaslessResponse.data.message, tx: gaslessResponse.data.tx };
};
