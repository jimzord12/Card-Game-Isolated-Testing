import axios from "../../apiConfig";
import { ICardDB } from "../../../src/types/CardTypes";

const GET_SOLD_CARDS_URL = "marketplace";

interface args {
  queryKey: ["playerSoldCards", number];
}

export const getSoldCards = async ({ queryKey }: args): Promise<ICardDB[]> => {
  const sellerId = queryKey[1];

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
