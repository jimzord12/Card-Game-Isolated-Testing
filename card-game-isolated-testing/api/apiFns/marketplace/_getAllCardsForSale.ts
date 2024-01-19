import axios from "../../apiConfig";
import { ICardDB } from "../../../src/types/CardTypes";

const GET_ALL_CARDS_FOR_SALE_URL = "cards/marketplace";

export const getAllCardsForSale = async (): Promise<ICardDB[]> => {
  console.log("🚀 GET - (All Cards for Sale), Sending Request...");

  const response = await axios.get(GET_ALL_CARDS_FOR_SALE_URL);

  console.log("🚀 GET ✅ - (All Cards for Sale): ", response.data);

  return response.data;
};
