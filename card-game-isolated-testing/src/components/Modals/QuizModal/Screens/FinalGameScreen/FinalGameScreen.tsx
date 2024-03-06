import LessFancyButton from "../../../../Buttons/LessFancyButton/LessFancyButton";
import { quizQuestionDetails } from "../../QuizModal";

interface FinalGameScreenProps {
  questionHistory: quizQuestionDetails[];
  rewards: number;
}

const FinalGameScreen = ({
  questionHistory,
  rewards,
}: FinalGameScreenProps) => {
  const correctAnswers = questionHistory.filter(
    (question) => question.wasCorrect
  ).length;
  const wrongAnswers = questionHistory.length - correctAnswers;

  return (
    <div className="w-full h-full p-4">
      <div className="text-center">
        {rewards === 3 && (
          <h2 className="font-Rocher text-3xl tablet:text-6xl">
            Unbelievable!
          </h2>
        )}
        {rewards === 2 && (
          <h2 className="font-Rocher text-3xl tablet:text-6xl">Incredible!</h2>
        )}
        {rewards === 1 && (
          <h2 className="font-Rocher text-3xl tablet:text-6xl">Good Job!</h2>
        )}
        {rewards === 0 && (
          <h2 className="font-Rocher rocher-red text-3xl tablet:text-6xl">
            You Failed
          </h2>
        )}
      </div>
      <div className="flex mint tablet:flex-col gap-4 mt-4 largeMobile:mt-8 tablet:gap-12">
        <div className="flex flex-col gap-2 w-1/2 tablet:items-center tablet:w-full">
          <p className="font-Rocher text-sm largeMobile:text-lg">
            Correct Answers: {correctAnswers}
          </p>
          <p className="font-Rocher text-sm largeMobile:text-lg">
            Wrong Answers: {wrongAnswers}
          </p>
        </div>
        <div className="flex w-full justify-center items-center">
          {rewards === 3 && (
            <h2 className="text-2xl">
              You won{" "}
              <span className="font-Rocher text-2xl tablet:text-5xl">50%</span>{" "}
              Resources Refund!
            </h2>
          )}
          {rewards === 2 && (
            <h2 className="text-2xl">
              You won{" "}
              <span className="font-Rocher text-2xl tablet:text-5xl">25%</span>{" "}
              Resources Refund!
            </h2>
          )}
          {rewards === 1 && (
            <h2 className="text-2xl">
              You won{" "}
              <span className="font-Rocher text-2xl tablet:text-5xl">10%</span>{" "}
              Resources Refund!
            </h2>
          )}
          {rewards === 0 && (
            <h2 className="text-2xl">
              Sadly, you did not win any Resources Refund!
            </h2>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center mt-8 largeMobile:mt-12 tablet:mt-20">
        <LessFancyButton text="Exit" onClick={() => console.log("Exit")} />
      </div>
    </div>
  );
};

export default FinalGameScreen;
