import axios from "../../apiConfig";
import { AxiosResponse } from "axios";
import { MySQLOperation } from "../../../src/types/MySQLTypes/Operations";

const PUT_UPDATE_CARD_STATS_URL = "card-stats";

interface ICardStatsToUpdate {
  // id: number; // Card's ID
  gold?: number;
  concrete?: number;
  metals?: number;
  crystals?: number;
  population?: number;
  energy?: number;
  rank?: number;
  expenses?: number;
}
export const updateCardStats = async (
  cardId: number,
  cardStatsData: ICardStatsToUpdate
): Promise<boolean> => {
  console.log("🚀 PUT - (Updating Cards Stats), Sending Request...");

  const response: AxiosResponse<MySQLOperation> = await axios.put(
    `${PUT_UPDATE_CARD_STATS_URL}/${cardId}`,
    cardStatsData
  );

  console.log("🚀 PUT ✅ - (Updating Cards Stats): ", response.data);

  return response.data.affectedRows === 1 ? true : false;
};
