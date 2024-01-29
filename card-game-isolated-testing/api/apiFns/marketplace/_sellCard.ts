import axios from "../../apiConfig";
import { AxiosResponse } from "axios";
import { MySQLOperation } from "../../../src/types/MySQLTypes/Operations";

const PUT_SELL_CARD_URL = "cards";

type CardForSale = {
  cardId: number;
  priceTag: number;
  in_mp: true;
  state: false;
};

// The Marketplace entry ID of the card (MySQL: table: marketplace)

export const sellCard = async (details: CardForSale): Promise<boolean> => {
  console.log("🚀 PUT - (Sell Card to Marketplace), Sending Request...");

  const response: AxiosResponse<MySQLOperation> = await axios.put(
    `${PUT_SELL_CARD_URL}/${details.cardId}`,
    details
  );

  console.log("🚀 PUT ✅ - (Sell Card to Marketplace): ", response.data);

  return response.data.affectedRows === 1 ? true : false;
};
