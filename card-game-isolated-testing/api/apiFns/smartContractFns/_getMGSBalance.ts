import axios from "../../apiConfig";

const GET_MGS_BALANCE = "web3/getMGSBalance";

interface ResponseData {
  success: boolean;
  balance: number;
}

export const getMGSBalance = async (
  walletAddress: string
): Promise<ResponseData> => {
  const response = await axios.post(GET_MGS_BALANCE, {
    userAddress: walletAddress,
  });
  const balance = Number(response.data.balance);

  return { success: response.data.success, balance };
};
