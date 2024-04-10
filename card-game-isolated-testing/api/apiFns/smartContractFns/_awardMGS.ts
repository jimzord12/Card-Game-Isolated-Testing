import axios from "../../apiConfig";

const POST_AWARD_MGS = "web3/awardMGS";

interface ResponseData {
  success: boolean;
}

export const awardMGS = async (
  walletAddress: string
): Promise<ResponseData> => {
  const response = await axios.post(POST_AWARD_MGS, {
    userAddress: walletAddress,
  });

  return { success: response.data.success };
};
