import axios from "../../apiConfig";
import { MySQLOperation } from "../../../src/types/MySQLTypes/Operations";
import { AxiosResponse } from "axios";

const PUT_SWAP_CARD_OWNERS_MARKETPLACE_URL = "cards/marketplace";

// The Marketplace entry ID of the card (MySQL: table: marketplace)

export const ownersSwapper = async (
  cardId: number,
  newOwnerId: number
): Promise<boolean> => {
  console.log("🚀 PUT - (Owners Swapper), Sending Request...");

  const response: AxiosResponse<MySQLOperation> = await axios.put(
    `${PUT_SWAP_CARD_OWNERS_MARKETPLACE_URL}/${cardId}`,
    { ownerId: newOwnerId }
  );

  console.log("🚀 PUT ✅ - (Owners Swapper): ", response.data);

  return response.data.affectedRows === 1 ? true : false;
};
