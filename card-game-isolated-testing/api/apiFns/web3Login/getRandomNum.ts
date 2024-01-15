import axios from "../../apiConfig";

const GET_RANDOM_NUM = "randomNum";

interface ResponseData {
  nonce: number;
}

export const getRandomNum = async (): Promise<ResponseData> => {
  const response = await axios.get(GET_RANDOM_NUM);

  return { nonce: response.data.randNum };
};
