import axios from "../../apiConfig";
import type { TransactionResponse } from "ethers";

const GIVE_ETH_NEW_PLAYER = "gasless/register";

interface ResponseData {
  message: string;
  tx: TransactionResponse;
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
