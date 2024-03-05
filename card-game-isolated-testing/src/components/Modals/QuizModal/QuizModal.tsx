import { useEffect, useState } from "react";
import { UseGlobalContext } from "../../../context/GlobalContext/GlobalContext";
import Label from "../../Labels/Label/Label";
import QuizGameScreen from "./Screens/QuizGameScreen/QuizGameScreen";
import StartScreen from "./Screens/StartScreen/StartScreen";
import FinalGameScreen from "./Screens/FinalGameScreen/FinalGameScreen";
import Rewards from "./Parts/Rewards/Rewards";
import Hearts from "./Parts/Hearts/Hearts";
import dummyQuestions from "./testData/dummyQuestions.json";
import useGetScreenSize from "../../../hooks/game/useGetScreenSize";

const QuizModal = () => {
  const { images } = UseGlobalContext();
  if (images === null || images === undefined)
    throw new Error("images is required");

  const screenSize = useGetScreenSize();

  const [gameStage, setGameStage] = useState(1);
  const [currentScreen, setCurrentScreen] = useState(<StartScreen />);
  const [hearts, setHearts] = useState(3);
  const [rewards, setRewards] = useState(0);
  const [questions, setQuestions] = useState(dummyQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [questions, setQuestions] = useState([] as typeof dummyQuestions);

  const labelPositionStyles = {
    largeMobile: "largeMobile:-top-9",
    tablet: "tablet:-top-9",
    largeScreen:
      screenSize === "desktop" ? "largeScreen:-top-14" : "largeScreen:-top-9",
  };

  useEffect(() => {
    if (gameStage === 0) {
      setCurrentScreen(<StartScreen />);
    } else if (gameStage === 1) {
      setCurrentScreen(
        <QuizGameScreen
          setCurrentScreen={setCurrentScreen}
          setHearts={setHearts}
          setRewards={setRewards}
          setQuestions={setQuestions}
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      );
    } else if (gameStage === 2) {
      setCurrentScreen(<FinalGameScreen />);
    } else {
      throw new Error("Invalid gameStage");
    }
  }, [gameStage, questions]);

  return (
    <div className="w-full h-full flex items-end tablet:items-center">
      <div className="relative bg-slate-700 w-full h-[92%] tablet:h-[75%] largeScreen:h-2/3 border-t-8 border-green-400 flex-col justify-center items-center">
        <div
          className={`absolute -top-8 left-0 w-full flex justify-center ${labelPositionStyles.largeMobile} ${labelPositionStyles.tablet} ${labelPositionStyles.largeScreen}`}
          about="QuizTime - title"
        >
          <Label
            labelImages={images.labels}
            type="golden"
            value="QuizTime"
            size={screenSize === "desktop" ? "medium" : "small"}
            valueType={{
              color: "black",
              addGrayScale: "no",
            }}
          />
        </div>
        <div className="flex w-full h-[14.5%] tablet:h-[10.5%] justify-between font-sans">
          <section about="Hearts - Lives">
            <Hearts hearts={hearts} />
          </section>
          <section about="Reward - Refund">
            <Rewards rewards={rewards} />
          </section>
        </div>
        <div className="h-[85.5%]">{currentScreen}</div>
      </div>
    </div>
  );
};

export default QuizModal;
