//TODO:
// 1 - Fetch the 5 Questions from the API

import { useCallback, useEffect, useState } from "react";
import useGetScreenSize from "../../../../../hooks/game/useGetScreenSize";
import QuestionTimer from "../../Parts/QuestionTimer/QuestionTimer";
import dummyQuestions from "../../testData/dummyQuestions.json";
import { quizQuestionDetails } from "../../QuizModal";
import { waitFor } from "../../../../../utils/general/waitPlease";
// import "./quizGameScreenStyles.css";

interface QuizGameScreenProps {
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  setRewards: React.Dispatch<React.SetStateAction<number>>;
  questions: typeof dummyQuestions;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  setQuestionHistory: React.Dispatch<
    React.SetStateAction<quizQuestionDetails[]>
  >;
  setGameStage: React.Dispatch<React.SetStateAction<number>>;
  hearts: number;
  rewards: number;
}

const gridStyles = {
  largeMobile: "largeMobile:flex largeMobile:flex-col",
  tablet: "tablet:text-md",
  largeScreen: "",
};

const btnStyles = {
  largeMobile: "largeMobile:text-sm largeMobile:p-2 largeMobile:px-4",
  tablet: "tablet:text-lg tablet:p-4 tablet:px-8",
  largeScreen: "",
};

const topicsStyles = {
  tablet:
    "tablet:border-[1px] tablet:pt-3 tablet:rounded-lg tablet:border-white tablet:bg-sky-800/75 tablet:shadow-lg",
};

const QuizGameScreen = ({
  setHearts,
  setRewards,
  questions,
  currentQuestion,
  setCurrentQuestion,
  setQuestionHistory,
  setGameStage,
  hearts,
  rewards,
}: QuizGameScreenProps) => {
  const screenSize = useGetScreenSize();
  // const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [playerAnswered, setPlayerAnswered] = useState<boolean>(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [timeRanOut, setTimeRanOut] = useState(false);

  const testing = false;

  // ⚡ GO TO FINAL SCREEN
  useEffect(() => {
    async function waitABitAndThenDoStaff() {
      await waitFor(3);
      setGameStage(2);
    }

    if (currentQuestion > 4 || hearts === 0 || rewards === 3) {
      waitABitAndThenDoStaff();
    }
  }, [currentQuestion, hearts, rewards, setGameStage]);

  // ⚡ GO TO NEXT QUESTION
  useEffect(() => {
    async function waitABitAndThenDoStaff() {
      await waitFor(3);
      setPlayerAnswered(false);
      setResetTimer(true);
      setCurrentQuestion((prev) => prev + 1);
    }

    if (playerAnswered && currentQuestion <= 4) {
      waitABitAndThenDoStaff();
    }
  }, [playerAnswered, questions, currentQuestion, setCurrentQuestion]);

  // ⚡ TIME RAN OUT
  useEffect(() => {
    async function waitABitAndThenDoStaff() {
      await waitFor(1);
      setPlayerAnswered(true);
      setHearts((prev) => prev - 1);
      setQuestionHistory((prev) => [
        ...prev,
        {
          index: currentQuestion,
          wasCorrect: false,
          title: questions[currentQuestion].title,
          mainTopic: questions[currentQuestion].mainTopic,
          subTopic: questions[currentQuestion].subtopic,
        },
      ]);
      setTimeRanOut(false);
    }

    if (timeRanOut && currentQuestion <= 4) {
      waitABitAndThenDoStaff();
    }
  }, [timeRanOut]);

  const handleAnswerClick = (index: number) => {
    if (index === questions[currentQuestion].correct && currentQuestion <= 4) {
      setRewards((prev) => prev + 1);
      setQuestionHistory((prev) => [
        ...prev,
        {
          index: currentQuestion,
          wasCorrect: true,
          title: questions[currentQuestion].title,
          mainTopic: questions[currentQuestion].mainTopic,
          subTopic: questions[currentQuestion].subtopic,
        },
      ]);
      setPlayerAnswered(true);
    } else {
      if (currentQuestion > 4) return;
      setHearts((prev) => prev - 1);
      setQuestionHistory((prev) => [
        ...prev,
        {
          index: currentQuestion,
          wasCorrect: false,
          title: questions[currentQuestion].title,
          mainTopic: questions[currentQuestion].mainTopic,
          subTopic: questions[currentQuestion].subtopic,
        },
      ]);
      setPlayerAnswered(true);

      // // Remove focus from the clicked button after a delay
      // setTimeout(() => {
      //   if (document.activeElement instanceof HTMLElement) {
      //     document.activeElement.blur();
      //   }
      // }, 2000); // Adjust the delay as needed
    }
  };

  const questionDurationCalc = useCallback(() => {
    if (testing) return 100 * 100;
    if (questions[currentQuestion].title.length < 75) return 30;
    return questions[currentQuestion].title.length / 25 + 30;
  }, []);

  if (currentQuestion > 4 || hearts === 0 || rewards === 3) {
    return (
      <div className="w-full h-full text-3xl flex justify-center items-center">
        Loading Results Screen...
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 h-full py-4 items-center justify-evenly font-sans overflow-auto">
        <div
          className={`flex flex-col justify-center items-center gap-4 ${topicsStyles.tablet}`}
        >
          {/* TOPICS */}
          <div
            className={`hidden h-fit tablet:flex text-sm`}
            about="Question Topics"
          >
            <section className="font-semibold " about="Question Topic Section">
              {questions[currentQuestion].mainTopic + ":"}&nbsp;
            </section>
            <section about="Question Section">
              {questions[currentQuestion].subtopic}
            </section>
          </div>

          {/* QUESTION */}
          <section
            className="h-fit px-4 mb-4 text-center text-2xl tablet:text-2xl largeScreen:max-w-[1200px]"
            about="Question Section"
          >
            {questions[currentQuestion].title}
          </section>
        </div>

        {/* ANSWERS */}
        <div
          id="answers-section"
          className="flex w-full h-fit justify-center items-center "
        >
          <section
            className={`grid grid-rows-2 grid-cols-2 gap-4 px-2 ${gridStyles.largeMobile} ${gridStyles.tablet} ${gridStyles.largeScreen}`}
            about="Answers/Buttons Section"
          >
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                className={`font-sans text-lg ${btnStyles.largeMobile} ${btnStyles.tablet} bg-slate-800 py-2 px-4 rounded-md col-span-1 largeScreen:hover:scale-110 largeScreen:hover:bg-sky-600 transform transition-all duration-300`}
                style={{
                  backgroundColor: !playerAnswered
                    ? ""
                    : index === questions[currentQuestion].correct
                    ? "green"
                    : "red",
                }}
                onClick={() => handleAnswerClick(index)}
              >
                {answer}
              </button>
            ))}
          </section>
        </div>

        {/* TIMER */}
        <div className="fixed w-full h-4 inset-x-0 bottom-0 tablet:absolute">
          <QuestionTimer
            duration={questionDurationCalc()}
            setTimeRanOut={setTimeRanOut}
            reset={resetTimer}
            start={!playerAnswered}
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
