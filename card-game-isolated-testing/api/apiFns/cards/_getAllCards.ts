import { ICardDB } from "../../../src/types";
import axios from "../../apiConfig";

const GET_ALL_CARDS_URL = "cards";

export const getAllCards = async (): Promise<ICardDB[]> => {
  console.log("🚀 GET - (All Cards), Sending Request...");

  const response = await axios.get(GET_ALL_CARDS_URL);

  console.log("🚀 GET ✅ - (All Cards): ", response.data);

  return response.data;
};
