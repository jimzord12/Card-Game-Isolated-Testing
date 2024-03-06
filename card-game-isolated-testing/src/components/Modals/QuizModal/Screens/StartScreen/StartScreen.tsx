import { useEffect, useState } from "react";
import { quizImages } from "../../../../../assets/quizImages";
import FancyButton from "../../../../Buttons/FancyButton/FancyButton";
import LessFancyButton from "../../../../Buttons/LessFancyButton/LessFancyButton";
import { waitFor } from "../../../../../utils/general/waitPlease";
import dummyQuestions from "../../testData/dummyQuestions.json";
import QuizGameInfo from "./Parts/QuizGameInfo";
import { ProgressBar } from "react-loader-spinner";
import useGetScreenSize from "../../../../../hooks/game/useGetScreenSize";

interface StartScreenProps {
  setQuestions: React.Dispatch<React.SetStateAction<typeof dummyQuestions>>;
  setGameStage: React.Dispatch<React.SetStateAction<number>>;
}

const StartScreen = ({ setQuestions, setGameStage }: StartScreenProps) => {
  const [displayInfo, setDisplayInfo] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [questionsFetched, setQuestionsFetched] = useState(false);

  const screenSize = useGetScreenSize();

  useEffect(() => {
    async function fetchQuestion() {
      setIsFetching(true);
      await waitFor(3);
      setQuestions(dummyQuestions);
      setQuestionsFetched(true);
    }

    if (startGame) {
      console.log("1. Fetching Questions...");

      fetchQuestion();
    }
  }, [setGameStage, setQuestions, startGame]);

  if (questionsFetched) {
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <FancyButton text="LET'S BEGIN" onClick={() => setGameStage(1)} />
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <div>
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            // color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{
              width:
                screenSize === "tablet" || screenSize === "desktop"
                  ? "320px"
                  : "160px",
              height:
                screenSize === "tablet" || screenSize === "desktop"
                  ? "180px"
                  : "80px",
            }}
          />
        </div>
        <h2 className="text-lg largeMobile:text-xl tablet:text-2xl">
          Getting Questions...
        </h2>
      </div>
    );
  }

  return (
    <>
      {displayInfo ? (
        <>
          <QuizGameInfo />
          <div className="absolute mt-4 translate-x-1/2 right-1/2 tablet:mt-12 largeScreen:mt-16">
            <LessFancyButton
              text="Go Back"
              onClick={() => setDisplayInfo((prev) => !prev)}
            />
          </div>
        </>
      ) : (
        <div className="font-sans relative flex flex-col gap-4 largeMobile:gap-8 tablet:gap-12 largeScreen:gap-16 items-center justify-center h-full">
          <FancyButton text="PLAY" onClick={() => setStartGame(true)} />
          <LessFancyButton
            text="Leave"
            variant="redish"
            onClick={() => console.log("Implement me!")}
          />
          <div
            className="absolute w-12 tablet:w-16 m-4 bottom-0 right-0 hover:cursor-pointer hover:scale-125"
            onClick={() => setDisplayInfo((prev: boolean) => !prev)}
          >
            <img
              className="object-contain max-w-full max-h-full"
              src={quizImages.questiomMarkImg}
              alt="Question Mark"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StartScreen;
