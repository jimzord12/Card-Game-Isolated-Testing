import { AxiosResponse } from "axios";
import axios from "../../apiConfig";
import { MySQLOperation } from "../../../src/types/MySQLTypes/Operations";

const CREATE_CARD_STATS_URL = "card-stats";

interface ICardStatsToCreate {
  cardId: number;
  gold: number;
  concrete: number;
  metals: number;
  crystals: number;
  population: number;
  energy: number;
  rank: number;
  expenses: number;
}

interface ResponseData {
  cardId: number;
  success: boolean;
}

export const createCardStats = async (
  cardStatsDetails: ICardStatsToCreate
): Promise<ResponseData> => {
  const response: AxiosResponse<MySQLOperation> = await axios.post(
    CREATE_CARD_STATS_URL,
    cardStatsDetails
  );

  const wasSuccessful = response.data.affectedRows === 1 ? true : false;

  return { cardId: response.data.insertId, success: wasSuccessful };
};
