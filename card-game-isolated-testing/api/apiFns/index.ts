// Gasless
import { gaslessNewPlayer } from "./gasless/gaslessNewPlayer";
import { gaslessOldPlayer } from "./gasless/gaslessOldPlayer";

// Web3 Login (Wallet Ownership Validation)
import { getRandomNum } from "./web3Login/getRandomNum";
import { validateSignedMsg } from "./web3Login/validateSignedMsg";

// Regarding Player
import getPlayerByWallet from "./player/_getPlayerByWallet";
import loginWithWallet from "./player/_loginWithWallet";
import { createPlayer } from "./player/_createPlayer";
import { getAllPlayers } from "./player/_getAllPlayers";
import { updatePlayerData } from "./player/_updatePlayerData";

// Regarding Marketplace
import { removeFromMP } from "./marketplace/_removeFromMP";
import { purchaseCard } from "./marketplace/_purchaseCard";
import { deletePurchase } from "./marketplace/_deletePurchase";
import { getSoldCards } from "./marketplace/_getSoldCards";
import { getAllCardsForSale } from "./marketplace/_getAllCardsForSale";
import { ownersSwapper } from "./marketplace/_ownersSwapper";
import { sellCard } from "./marketplace/_sellCard";

// Regarding Cards
import { getAllCards } from "./cards/_getAllCards";
import { getCardById } from "./cards/_getCardById";
import { createCard } from "./cards/_createCard";
import { createCardStats } from "./cards/_createCardStats";
import { updateCardData } from "./cards/_updateCardData";
import { updateCardStats } from "./cards/_updateCardStats";
import { getCardStatsById } from "./cards/_getCardStatsById";
import { deleteCard } from "./cards/_deleteCard";

// Quiz Game
import { getRandomQuestions } from "./quizGame/_getRandomQuestions";

// Smart Contract Functions
import { getMGSBalance } from "./smartContractFns/_getMGSBalance";
import { awardMGS } from "./smartContractFns/_awardMGS";

// Google Form
import { getRatings } from "./googleForm/_getRatings";

export {
  getPlayerByWallet,
  loginWithWallet,
  gaslessNewPlayer,
  gaslessOldPlayer,
  getRandomNum,
  validateSignedMsg,
  createPlayer,
  getAllPlayers,
  removeFromMP,
  purchaseCard,
  deletePurchase,
  getSoldCards,
  getAllCardsForSale,
  ownersSwapper,
  updatePlayerData,
  sellCard,
  getAllCards,
  getCardById,
  createCard,
  createCardStats,
  updateCardData,
  updateCardStats,
  getCardStatsById,
  getRandomQuestions,
  getMGSBalance,
  awardMGS,
  deleteCard,
  getRatings,
};
