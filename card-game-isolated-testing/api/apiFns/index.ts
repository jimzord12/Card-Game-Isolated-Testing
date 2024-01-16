import getPlayerByWallet from "./regardingPlayer/getPlayerByWallet";
import loginWithWallet from "./regardingPlayer/loginWithWallet";
import { createPlayer } from "./regardingPlayer/createPlayer";
import { gaslessNewPlayer } from "./gasless/gaslessNewPlayer";
import { gaslessOldPlayer } from "./gasless/gaslessOldPlayer";
import { getRandomNum } from "./web3Login/getRandomNum";
import { validateSignedMsg } from "./web3Login/validateSignedMsg";
import { getAllPlayers } from "./regardingPlayer/getAllPlayers";

export {
  getPlayerByWallet,
  loginWithWallet,
  gaslessNewPlayer,
  gaslessOldPlayer,
  getRandomNum,
  validateSignedMsg,
  createPlayer,
  getAllPlayers,
};
