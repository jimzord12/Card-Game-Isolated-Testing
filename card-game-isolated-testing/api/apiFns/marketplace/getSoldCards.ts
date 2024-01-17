import axios from "../../apiConfig";
import { ICardDB } from "../../../src/types/CardTypes";

const GET_SOLD_CARDS_URL = "marketplace";

export const getSoldCards = async (sellerId: number): Promise<ICardDB[]> => {
  console.log(
    `🚀 GET - (Sold Cards for PlayerID: [${sellerId}]), Sending Request...`
  );

  const response = await axios.get(`${GET_SOLD_CARDS_URL}/${sellerId}`);

  console.log(
    `🚀 GET ✅ - (Sold Cards for PlayerID: [${sellerId}]): `,
    response.data
  );

  return response.data;
};
