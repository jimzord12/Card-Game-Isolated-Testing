//TODO:
// 1 - Fetch the 5 Questions from the API

import { useCallback } from "react";
import useGetScreenSize from "../../../../../hooks/game/useGetScreenSize";
import QuestionTimer from "../../Parts/QuestionTimer/QuestionTimer";
import dummyQuestions from "../../testData/dummyQuestions.json";
import { quizQuestionDetails } from "../../QuizModal";

interface QuizGameScreenProps {
  setCurrentScreen: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  setRewards: React.Dispatch<React.SetStateAction<number>>;
  setQuestions: React.Dispatch<React.SetStateAction<typeof dummyQuestions>>;
  questions: typeof dummyQuestions;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  setQuestionHistory: React.Dispatch<
    React.SetStateAction<quizQuestionDetails[]>
  >;
}

const gridStyles = {
  largeMobile: "largeMobile:flex largeMobile:flex-col",
  tablet: "tablet:text-md",
  largeScreen: "",
};

const btnStyles = {
  largeMobile: "largeMobile:text-sm largeMobile:p-2 largeMobile:px-4",
  tablet: "tablet:text-md tablet:p-4 tablet:px-8",
  largeScreen: "",
};

const topicsStyles = {
  tablet:
    "tablet:border-[1px] tablet:pt-3 tablet:rounded-lg tablet:border-white tablet:bg-sky-800/75 tablet:shadow-lg",
};

const QuizGameScreen = ({
  setCurrentScreen,
  setHearts,
  setRewards,
  setQuestions,
  questions,
  currentQuestion,
  setCurrentQuestion,
  setQuestionHistory,
}: QuizGameScreenProps) => {
  const screenSize = useGetScreenSize();

  const questionDurationCalc = useCallback(() => {
    if (questions[currentQuestion].title.length < 75) return 12;
    return 12 + questions[currentQuestion].title.length / 25;
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 h-full py-4 items-center justify-evenly font-sans">
        <div
          className={`flex flex-col justify-center items-center gap-4 ${topicsStyles.tablet}`}
        >
          {/* TOPICS */}
          <div
            className={`hidden h-fit tablet:flex text-sm`}
            about="Question Topics"
          >
            <section className="font-semibold " about="Question Topic Section">
              {questions[0].mainTopic + ":"}&nbsp;
            </section>
            <section about="Question Section">{questions[0].subtopic}</section>
          </div>

          {/* QUESTION */}
          <section
            className="h-fit text-sm px-4 mb-4 text-center largeMobile:text-lg tablet:text-2xl largeScreen:max-w-[1200px]"
            about="Question Section"
          >
            {questions[currentQuestion].title}
          </section>
        </div>

        {/* ANSWERS */}
        <div className="flex w-full h-fit justify-center items-center ">
          <section
            className={`grid grid-rows-2 grid-cols-2 gap-4 px-2 ${gridStyles.largeMobile} ${gridStyles.tablet} ${gridStyles.largeScreen}`}
            about="Answers/Buttons Section"
          >
            {questions[0].answers.map((answer, index) => (
              <button
                key={index}
                className={`font-sans text-xs ${btnStyles.largeMobile} ${btnStyles.tablet} bg-slate-800 p-2 rounded-md col-span-1 hover:scale-110 hover:bg-sky-600 transform transition-transform duration-300`}
              >
                {answer}
              </button>
            ))}
          </section>
        </div>
        <div className="absolute w-full inset-x-0 bottom-0">
          <QuestionTimer
            duration={questionDurationCalc()}
            reset={false}
            start={true}
            height={
              screenSize === "mobile"
                ? "10px"
                : screenSize === "tablet"
                ? "15px"
                : "20px"
            }
          />
        </div>
      </div>
    </>
  );
};

export default QuizGameScreen;
