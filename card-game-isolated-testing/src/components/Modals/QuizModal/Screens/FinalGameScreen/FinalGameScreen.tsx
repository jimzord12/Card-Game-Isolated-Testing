import { ProgressBar } from "react-loader-spinner";
import { updatePlayerData as updatePlayerDataDB } from "../../../../../../api/apiFns";
import { useToastError } from "../../../../../hooks/notifications";
import { useGameVarsStore } from "../../../../../stores/gameVars";
import { CardRequirements } from "../../../../../types";
import { addResources } from "../../../../../utils/game/resourcesHandlers";
import LessFancyButton from "../../../../Buttons/LessFancyButton/LessFancyButton";
import { quizQuestionDetails } from "../../QuizModal";
import { waitFor } from "../../../../../utils/general/waitPlease";
import { useState } from "react";
import { useModalStore } from "../../../../../stores/modalStore";

interface FinalGameScreenProps {
  questionHistory: quizQuestionDetails[];
  rewards: number;
  resourceCosts: CardRequirements;
}

const FinalGameScreen = ({
  questionHistory,
  rewards,
  resourceCosts,
}: FinalGameScreenProps) => {
  const playerData = useGameVarsStore((state) => state.player);
  const updatePlayerData = useGameVarsStore((state) => state.updatePlayerData);
  const popModal = useModalStore((state) => state.popModal);

  const toastError = useToastError();

  const [loading, setLoading] = useState(false);

  const correctAnswers = questionHistory.filter(
    (question) => question.wasCorrect
  ).length;

  const wrongAnswers = questionHistory.length - correctAnswers;

  const handleRewards = async () => {
    if (rewards === 0) return;

    const refundPercentage = rewards === 3 ? 0.5 : rewards === 2 ? 0.25 : 0.1;

    if (
      playerData === null ||
      playerData.gold === null ||
      playerData.concrete === null ||
      playerData.metals === null ||
      playerData.crystals === null ||
      playerData.population === null ||
      playerData.diesel === null
    ) {
      toastError.showError(
        "There was an Error!",
        "ActionsSection: LevelUp: Something is null!"
      );
      throw new Error("⛔ ActionsSection: LevelUp: Player is null!");
    }
    const playerResources: CardRequirements = {
      gold: playerData.gold,
      concrete: playerData.concrete,
      metals: playerData.metals,
      crystals: playerData.crystals,
      population: playerData.population,
      diesel: playerData.diesel,
    };

    console.log("1. Player Resources: ", playerResources);
    console.log("2. Resource Costs: ", resourceCosts);
    console.log("3. Refund Percentage: ", refundPercentage);

    const newPlayerResources = addResources({
      playerResources: playerResources,
      requirements: resourceCosts,
      percentage: refundPercentage,
    });

    console.log("4. New Player Resources: ", newPlayerResources);

    try {
      // 🔷 Updates the Resources in DB
      updatePlayerDataDB(playerData.id, newPlayerResources);

      // 🔷 Updates the Resources of GameVars Store
      updatePlayerData(newPlayerResources);
    } catch (error) {
      toastError.showError(
        "There was an Error!",
        "FinalGameScreen: Claim Reward: Something went wrong!"
      );
      throw new Error(
        "⛔ FinalGameScreen: Claim Reward: Something went wrong!"
      );
    } finally {
      setLoading(false);
      await waitFor(1);
      popModal();
      popModal();
    }
  };

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
              <span className="font-Rocher text-2xl px-2 tablet:text-5xl">
                50%
              </span>{" "}
              Resources Refund!
            </h2>
          )}
          {rewards === 2 && (
            <h2 className="text-2xl">
              You won{" "}
              <span className="font-Rocher text-2xl px-2 tablet:text-5xl">
                25%
              </span>{" "}
              Resources Refund!
            </h2>
          )}
          {rewards === 1 && (
            <h2 className="text-2xl">
              You won{" "}
              <span className="font-Rocher text-2xl px-2 tablet:text-5xl">
                10%
              </span>{" "}
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
        {loading ? (
          <div className="w-12 h-12">
            <ProgressBar
              visible={true}
              height="12"
              width="12"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{
                width: "60px",
                height: "60px",
              }}
            />
          </div>
        ) : (
          <LessFancyButton
            text={rewards === 0 ? "Exit" : "Claim Reward!"}
            onClick={() => {
              if (rewards === 0) {
                popModal();
                return;
              }
              setLoading(true);
              handleRewards();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FinalGameScreen;
