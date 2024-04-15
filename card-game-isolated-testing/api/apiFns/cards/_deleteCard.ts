import axios from "../../apiConfig";
import { AxiosResponse } from "axios";
import { MySQLOperation } from "../../../src/types/MySQLTypes/Operations";

const DLETE_CARD_ENDPOINT = "cards";

// interface ICardDataToUpdate {
//   id: number; // Card's ID
// }
export const deleteCard = async (cardId: number): Promise<boolean> => {
  console.log("🚀 PUT - (Updating Cards Stats), Sending Request...");

  const response: AxiosResponse<MySQLOperation> = await axios.delete(
    `${DLETE_CARD_ENDPOINT}/${cardId}`
  );

  console.log("🚀 DELETE ✅ - (Deleting Card): ", response.data);

  return response.data.affectedRows === 1 ? true : false;
};
