import axios from "../../apiConfig";
import { PlayerData } from "../../../src/types/PlayerTypes/Player";
import { AxiosResponse } from "axios";
import { MySQLOperation } from "../../../src/types/MySQLTypes/Operations";

const PUT_PLAYER_STATS_URL = "players";

// The Marketplace entry ID of the card (MySQL: table: marketplace)

export const updatePlayerData = async (
  playerId: number,
  playerData: Partial<PlayerData>
): Promise<boolean> => {
  console.log("🚀 PUT - (Updating Player Stats), Sending Request...");

  const response: AxiosResponse<MySQLOperation> = await axios.put(
    `${PUT_PLAYER_STATS_URL}/${playerId}`,
    playerData
  );

  console.log(
    "🚀 PUT ✅ - (Updated Player Stats): ",
    response.data.affectedRows === 1 ? true : false
  );

  return response.data.affectedRows === 1 ? true : false;
};
