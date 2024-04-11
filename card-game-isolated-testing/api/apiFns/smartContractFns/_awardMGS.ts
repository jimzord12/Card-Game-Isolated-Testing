import axios from "../../apiConfig";

const POST_AWARD_MGS = "web3/awardMGS";

interface ResponseData {
  success: boolean;
}

export const awardMGS = async (
  userAddress: string,
  amount: number
): Promise<ResponseData> => {
  const response = await axios.post(POST_AWARD_MGS, {
    userAddress,
    amount,
  });

  return { success: response.data.success };
};
