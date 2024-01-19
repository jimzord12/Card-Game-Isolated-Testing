import axios from "../../apiConfig";

const POST_BUY_CARD_FROM_MARKETPLACE_URL = "marketplace";

type PurchaseDetails = {
  cardId: number;
  buyerId: number;
  sellerId: number;
  priceTag: number;
  completed: boolean;
  rarity: number;
  templateId: number;
  level: number;
};

// The Marketplace entry ID of the card (MySQL: table: marketplace)
type ResponseType = { id: number };

export const purchaseCard = async (
  purchaseDetails: PurchaseDetails
): Promise<ResponseType> => {
  console.log(
    "🚀 POST - (Purchasing a Card From MP), Sending Request: ",
    purchaseDetails
  );

  const response = await axios.post(
    POST_BUY_CARD_FROM_MARKETPLACE_URL,
    purchaseDetails
  );

  console.log("🚀 POST ✅ - (Purchasing a Card From MP): ", response.data);

  return response.data.id;
};
