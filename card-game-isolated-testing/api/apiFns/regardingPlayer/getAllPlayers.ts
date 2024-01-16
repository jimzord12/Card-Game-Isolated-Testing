import axios from "../../apiConfig";
import { IPlayerDB } from "../../../src/types/PlayerTypes/Player";

const GET_ALL_PL_URL = "players";

export const getAllPlayers = async (): Promise<IPlayerDB[]> => {
  console.log("🚀 GET - (All Players for Leaderboard), Sending Request...");

  const response = await axios.get(GET_ALL_PL_URL);

  console.log("🚀 GET ✅ - (All Players for Leaderboard): ", response.data);

  return response.data;
};
