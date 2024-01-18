import { AxiosResponse } from "axios";
import axios from "../../apiConfig";
import { MySQLOperation } from "../../../src/types/MySQLTypes/Operations";

const CREATE_CARD_STATS_URL = "card-stats";

interface ICardStatsToCreate {
  cardId: number;
  gold: 0;
  concrete: 0;
  metals: 0;
  crystals: 0;
  population: 0;
  energy: 0;
  rank: 0;
  expenses: 0;
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
