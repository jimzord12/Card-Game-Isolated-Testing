export interface SurveyResponse {
  response_id: string;
  question_01: number;
  question_02: string;
  question_03: number;
  question_04: number;
  question_05: string;
  question_06: string;
  question_07: number;
  question_08: number;
  question_09: number;
  question_10: number; // <- This is the rating
  question_11: number | null;
  wallet: string;
}
