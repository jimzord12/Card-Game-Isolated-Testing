import { ICardDB } from "../../../src/types";
import axios from "../../apiConfig";

const GET_SPECIFIC_CARD_STATS_URL = "card-stats";

export const getCardStatsById = async (cardId: number): Promise<ICardDB> => {
  console.log(`🚀 GET - (Specific Card Stats) [${cardId}], Sending Request...`);

  const response = await axios.get(`${GET_SPECIFIC_CARD_STATS_URL}/${cardId}}`);

  console.log(`🚀 GET ✅ - (Specific Card Stats) [${cardId}]: `, response.data);

  return response.data[0];
};
