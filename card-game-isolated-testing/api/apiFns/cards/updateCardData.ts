import axios from "../../apiConfig";
import { AxiosResponse } from "axios";
import { MySQLOperation } from "../../../src/types/MySQLTypes/Operations";

const PUT_UPDATE_CARD_DATA_URL = "cards";

interface ICardDataToUpdate {
  id: number; // Card's ID
  state?: 0;
  endDate?: 0;
  level?: 0;
}
export const updateCardData = async (
  cardData: ICardDataToUpdate
): Promise<boolean> => {
  console.log("🚀 PUT - (Updating Cards Stats), Sending Request...");

  const response: AxiosResponse<MySQLOperation> = await axios.put(
    `${PUT_UPDATE_CARD_DATA_URL}/${cardData.id}`,
    cardData
  );

  console.log("🚀 PUT ✅ - (Updating Cards Stats): ", response.data);

  return response.data.affectedRows === 1 ? true : false;
};
