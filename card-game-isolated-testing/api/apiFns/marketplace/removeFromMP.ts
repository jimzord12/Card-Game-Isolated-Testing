import { AxiosResponse } from "axios";
import axios from "../../apiConfig";
import { MySQLOperation } from "../../../src/types/MySQLTypes/Operations";

const PUT_REMOVE_CARD_FROM_MARKETPLACE_URL = "cards/marketplace";

export const removeFromMP = async (cardId: number): Promise<boolean> => {
  console.log("🚀 PUT - (Remove Card From MP), Sending Request...");

  const response: AxiosResponse<MySQLOperation> = await axios.put(
    `${PUT_REMOVE_CARD_FROM_MARKETPLACE_URL}/${cardId}`,
    {
      in_mp: false,
    }
  );

  console.log("🚀 PUT ✅ - (Remove Card From MP): ", response.data);

  return response.data.affectedRows === 1 ? true : false;
};
