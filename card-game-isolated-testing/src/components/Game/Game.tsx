import { Suspense, lazy, useEffect, useRef, useState } from "react";
import ModalProvider from "../../context/ModalContext/ModalProvider";
import UseLandscape from "../../hooks/useLandscape";
import RotateDevice from "../RotateDevice/RotateDevice";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";
import { useRequireAuth } from "../../hooks/auth/useRequiresAuth";
import CustomButton from "../Buttons/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import GameButton from "../Buttons/GameButton/GameButton";
import StatsBars from "../StatsBars/StatsBars";
import GameWorker from "../../webWorkers/gameLoopWorker.worker?worker";
import {
  IGameLoopWorkerInput,
  gameLoopWorkerReturnType,
} from "../../types/GameLoopTypes/GameLoopTypes";
import useGameLoop from "../../hooks/game/gameLoop/useGameLoop";
import useValuesChecker from "../../hooks/game/gameLoop/useValuesChecker";
import { gamePace } from "../../constants/game/gameConfig";
// import CraftCardModal from "../Modals/InGameModals/CraftCardModal/CraftCardModal";
// import InventoryModal from "../Modals/InGameModals/InventoryModal/InventoryModal";

const ImageProviderV5 = lazy(
  () => import("../../context/GlobalContext/GlobalContext")
);
const TownMap = lazy(() => import("../../pages/Maps/TownMap/TownMap"));
const WorldMap = lazy(() => import("../../pages/Maps/WorldMap/WorldMap"));

const CraftCardModal = lazy(
  () => import("../Modals/InGameModals/CraftCardModal/CraftCardModal")
);
const InventoryModal = lazy(
  () => import("../Modals/InGameModals/InventoryModal/InventoryModal")
);

type MapTypes = "town" | "world";

const Game = () => {
  const shouldShow = UseLandscape();
  const [loading, setLoading] = useState(true);
  const [mapToDisplay, setMapToDisplay] = useState<MapTypes>("world");

  const [isInvModalOpen, setIsInvModalOpen] = useState(false);
  const [isCraftModalOpen, setIsCraftModalOpen] = useState(false);

  const gameWorker = useRef<Worker | null>(null);
  const gameLoopTick = useRef(0);

  const navigate = useNavigate();

  const auth = useRequireAuth();

  const { setNewGameState, getGameState } = useGameLoop();
  const { energyChecker, maintenanceSubtracker } = useValuesChecker();

  // If not authenticated, nothing will be rendered and user will be redirected
  function gameLoopRunner(/* currentGameState: IGameLoopWorkerInput */) {
    const currentGameState = getGameState();
    console.log("🎮 [Game.tsx] OLD - GameState: ", currentGameState);
    gameWorker.current?.postMessage(currentGameState);
  }

  useEffect(() => {
    // Initialize the worker
    gameWorker.current = new GameWorker();

    gameWorker.current.onmessage = (
      event: MessageEvent<gameLoopWorkerReturnType>
    ) => {
      const { wasSuccess, newState } = event.data;

      if (wasSuccess) {
        energyChecker();
        maintenanceSubtracker();
        // Update your game state or Zustand store here based on `newState`
        console.log("🎮 [Game.tsx] New - State: ", newState);
        console.log(" ---------------------------------------");

        setNewGameState({ ...newState });
        // gameLoopTick.current += 1; // ✨ Uncomment after testing
      } else {
        throw new Error(
          "⛔ Game.tsx: Game Loop Worker failed to process the game state"
        );
      }
    };

    // // Setup interval for game loop
    // const gameLoopInterval = setInterval(() => {
    //

    //   gameLoopRunner(currentGameState);
    // }, gamePace * 1000 * 2); // 10 sec

    return () => {
      // Terminate the worker when the component unmounts
      gameWorker.current?.terminate();
      // clearInterval(gameLoopInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameLoopTick.current]);

  if (!auth.user) return null;

  return (
    <>
      {loading && <LoadingScreen />}
      <Suspense
        fallback={<div>Dynamically Importing the ImageProviderV5...</div>}
      >
        <ImageProviderV5 setLoading={setLoading}>
          {!loading && (
            <>
              <RotateDevice show={shouldShow} />
              {/* INV + CRAFT MODALS */}

              <CraftCardModal
                isCraftModalOpen={isCraftModalOpen}
                setIsCraftModalOpen={setIsCraftModalOpen}
              />
              <InventoryModal
                isInvModalOpen={isInvModalOpen}
                setIsInvModalOpen={setIsInvModalOpen}
              />
              <div className="z-[401] absolute">
                <StatsBars />
              </div>

              <div className="z-[401] absolute top-4 left-20">
                <CustomButton
                  title="Swap Map"
                  handleClick={() =>
                    setMapToDisplay((prev) =>
                      prev === "world" ? "town" : "world"
                    )
                  }
                />
              </div>
              <div className="z-[401] absolute top-4 left-[280px]">
                <CustomButton title="Run Loop" handleClick={gameLoopRunner} />
              </div>
              <div className="z-[401] absolute top-24 left-20">
                <CustomButton
                  title="Marketplace"
                  restStyles="bg-blue-500 hover:bg-blue-700"
                  handleClick={() => navigate("/marketplace/")}
                />
              </div>
              <div className="z-[401] absolute top-44 left-20">
                <CustomButton
                  title="Leaderboard"
                  restStyles="bg-violet-500 hover:bg-violet-700"
                  handleClick={() => navigate("/leaderboard/")}
                />
              </div>
              <div className="z-[401] absolute top-64 left-20">
                <GameButton
                  onClick={() => {
                    setIsInvModalOpen(false);
                    setIsCraftModalOpen((prev) => !prev);
                  }}
                  text="Craft Modal"
                  btnType="primary"
                />
              </div>
              <div className="z-[401] absolute top-[336px] left-20">
                <GameButton
                  onClick={() => {
                    setIsCraftModalOpen(false);
                    setIsInvModalOpen((prev) => !prev);
                  }}
                  text="Inventory Modal"
                  btnType="primary"
                />
              </div>

              <ModalProvider>
                {mapToDisplay === "town" && <TownMap />}
                {mapToDisplay === "world" && <WorldMap />}
              </ModalProvider>
            </>
          )}
        </ImageProviderV5>
      </Suspense>
    </>
  );
};

export default Game;
