import axios from "../../apiConfig";
import type { TransactionResponse } from "ethers";

const GIVE_ETH_OLD_PLAYER = "gasless/login";

interface ResponseData {
  message: string;
  tx: TransactionResponse;
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
