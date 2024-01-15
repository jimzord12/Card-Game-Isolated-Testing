import axios from "../../apiConfig";

const SIGN_MESSAGE = "authNoPwd/web3Auth";

interface ResponseData {
  verified: boolean;
}

export const validateSignedMsg = async (
  message: string,
  walletAddress: string,
  signedMessage: string
): Promise<ResponseData> => {
  const response = await axios.post(SIGN_MESSAGE, {
    message,
    userAddress: walletAddress,
    signedMessage,
  });

  return { verified: response.data.verified };
};
