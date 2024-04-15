import { AxiosResponse } from "axios";
import axios from "../../apiConfig";
import { MySQLOperation } from "../../../src/types/MySQLTypes/Operations";

const CREATE_CARD_URL = "cards";

interface ICardToCreate {
  templateId: number;
  level?: number;
  ownerId: number;
  in_mp: false; // Replace 'any' with the actual type if known
  priceTag: null; // Replace 'any' with the actual type if known
  state: false;
  locked: false;
  rarity: number;
  creationTime: string;
  creator: string;
}

interface ResponseData {
  cardId: number;
  success: boolean;
  // card: CardClass;
}

export const createCard = async (
  cardDetails: ICardToCreate
  // card: CardClass
): Promise<ResponseData> => {
  const response: AxiosResponse<MySQLOperation> = await axios.post(
    CREATE_CARD_URL,
    cardDetails
  );

  const wasSuccessful = response.data.affectedRows === 1 ? true : false;

  return { cardId: response.data.insertId, success: wasSuccessful };
};
