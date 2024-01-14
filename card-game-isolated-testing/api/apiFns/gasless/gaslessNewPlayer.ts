import axios from "../../apiConfig";
import { ethers } from "ethers";

const GIVE_ETH_NEW_PLAYER = "gasless/register";

interface ResponseData {
  message: string;
  tx: ethers.TransactionReceipt;
}

export const gaslessNewPlayer = async (
  walletAddress: string
): Promise<ResponseData> => {
  const gaslessResponse = await axios.post(
    GIVE_ETH_NEW_PLAYER,
    JSON.stringify({ address: walletAddress }),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return { message: gaslessResponse.data.message, tx: gaslessResponse.data.tx };
};
