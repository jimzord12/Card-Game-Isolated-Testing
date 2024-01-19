import axios from "../../apiConfig";
import { MySQLOperation } from "../../../src/types/MySQLTypes/Operations";
import { AxiosResponse } from "axios";

const DELETE_CARD_FROM_MARKETPLACE_URL = "marketplace";

export const deletePurchase = async (cardId: number): Promise<boolean> => {
  console.log(
    `🚀 DELETE - (Removing Card from Marketplace with ID: [${cardId}]), Sending Request...`
  );

  const response: AxiosResponse<MySQLOperation> = await axios.delete(
    DELETE_CARD_FROM_MARKETPLACE_URL,
    {
      data: {
        cardId: cardId,
      },
    }
  );

  console.log(
    `🚀 DELETE ✅ - (Removing Card from Marketplace with ID: [${cardId}]): `,
    response.data
  );

  return response.data.affectedRows === 1 ? true : false;
};
