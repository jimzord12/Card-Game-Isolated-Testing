import { AxiosResponse } from "axios";
import { SurveyResponse } from "../../../src/types/GoogleSurvey/SurveyType";
import axios from "../../apiConfig";

const GET_RATINGS_URL = "google-form-submit";

// const testData = [
//   {
//     id: 1,
//     response_id:
//       "2_ABaOnufXUldlC4Q10CV5xpX0z0HE65LUcGGakvX9-Q2IsnFNMDsL65zEQrX4JnjJSw",
//     question_01: 2,
//     question_02: "Local Wallet",
//     question_03: 5,
//     question_04: 5,
//     question_05: "No problems",
//     question_06: "50000K HOURS",
//     question_07: 4,
//     question_08: 3,
//     question_09: 3,
//     question_10: 5,
//     question_11: null,
//     wallet: "0x2Faf00D0997F285135F1dE7bC138791D529eFcc7",
//   },
//   {
//     id: 3,
//     response_id:
//       "2_ABaOnufXUldlC4Q10CV5xpX0z0HE65LUcGGakvX9-Q2IsnFNMDsL65zEQrX4JnjJSw",
//     question_01: 2,
//     question_02: "Metamask Wallet",
//     question_03: 5,
//     question_04: 5,
//     question_05: "No problems",
//     question_06: "Less than 10 minutes",
//     question_07: 4,
//     question_08: 3,
//     question_09: 3,
//     question_10: 4,
//     question_11: null,
//     wallet: "0x2Faf00D0997F285135F1dE7bC138791D529eFcc7",
//   },
//   {
//     id: 4,
//     response_id:
//       "2_ABaOnufXUldlC4Q10CV5xpX0z0HE65LUcGGakvX9-Q2IsnFNMDsL65zEQrX4JnjJSw",
//     question_01: 2,
//     question_02: "Metamask Wallet",
//     question_03: 5,
//     question_04: 5,
//     question_05: "No problems",
//     question_06: "Less than 10 minutes",
//     question_07: 4,
//     question_08: 3,
//     question_09: 3,
//     question_10: 3,
//     question_11: null,
//     wallet: "0x2Faf00D0997F285135F1dE7bC138791D529eFcc7",
//   },
//   {
//     id: 5,
//     response_id:
//       "2_ABaOnufXUldlC4Q10CV5xpX0z0HE65LUcGGakvX9-Q2IsnFNMDsL65zEQrX4JnjJSw",
//     question_01: 2,
//     question_02: "Metamask Wallet",
//     question_03: 5,
//     question_04: 5,
//     question_05: "No problems",
//     question_06: "Less than 10 minutes",
//     question_07: 4,
//     question_08: 3,
//     question_09: 3,
//     question_10: 4,
//     question_11: null,
//     wallet: "0x2Faf00D0997F285135F1dE7bC138791D529eFcc7",
//   },
//   {
//     id: 6,
//     response_id:
//       "2_ABaOnufXUldlC4Q10CV5xpX0z0HE65LUcGGakvX9-Q2IsnFNMDsL65zEQrX4JnjJSw",
//     question_01: 2,
//     question_02: "Metamask Wallet",
//     question_03: 5,
//     question_04: 5,
//     question_05: "No problems",
//     question_06: "Less than 10 minutes",
//     question_07: 4,
//     question_08: 3,
//     question_09: 3,
//     question_10: 5,
//     question_11: null,
//     wallet: "0x2Faf00D0997F285135F1dE7bC138791D529eFcc7",
//   },
// ];

export const getRatings = async (): Promise<SurveyResponse[]> => {
  console.log("🚀 [SENDING] - GET - (All Google Responses)...");

  const response: AxiosResponse<SurveyResponse[]> = await axios.get(
    GET_RATINGS_URL
  );

  console.log("🚀 [DONE] - GET ✅ - (All Google Responses): ", response);

  return response.data;
};
