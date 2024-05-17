import { AxiosResponse } from "axios";
import { SurveyResponse } from "../../../src/types/GoogleSurvey/SurveyType";
import axios from "../../apiConfig";

const GET_RATINGS_URL = "top10-players-report";

export const top10PlayersReport = async (): Promise<SurveyResponse[]> => {
  console.log("🚀 [SENDING] - GET - (Month's Top 10 Players)...");

  const response: AxiosResponse<SurveyResponse[]> = await axios.get(
    GET_RATINGS_URL
  );

  console.log("🚀 [DONE] - GET ✅ - (Month's Top 10 Players): ", response);

  return response.data;
};
