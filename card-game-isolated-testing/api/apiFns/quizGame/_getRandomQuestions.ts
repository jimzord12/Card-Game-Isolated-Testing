import axios from "../../apiConfig";
import dummyQuestions from "../../../src/components/Modals/QuizModal/testData/dummyQuestions.json";

const GET_ALL_PL_URL = "quiz-questions";
type quizQuestions = typeof dummyQuestions;

export const getRandomQuestions = async (): Promise<quizQuestions> => {
  console.log("🚀 GET - (5x Random Quiz Question), Sending Request...");

  const response = await axios.get(GET_ALL_PL_URL);

  console.log("🚀 GET ✅ - (5x Random Quiz Question): ", response.data);

  return response.data;
};
