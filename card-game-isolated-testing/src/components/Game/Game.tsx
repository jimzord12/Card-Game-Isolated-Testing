import { Suspense, lazy, useEffect, useRef, useState } from "react";
import ModalProvider from "../../context/ModalContext/ModalProvider";
import UseLandscape from "../../hooks/useLandscape";
import RotateDevice from "../RotateDevice/RotateDevice";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";
import { useRequireAuth } from "../../hooks/auth/useRequiresAuth";
// import CustomButton from "../Buttons/CustomButton/CustomButton";
// import { useNavigate } from "react-router-dom";
import GameButton from "../Buttons/GameButton/GameButton";
// import StatsBars from "../StatsBars/StatsBars";
import GameWorker from "../../webWorkers/gameLoopWorker.worker?worker";
import { gameLoopWorkerReturnType } from "../../types/GameLoopTypes/GameLoopTypes";
import useGameLoop from "../../hooks/game/gameLoop/useGameLoop";
import useValuesChecker from "../../hooks/game/gameLoop/useValuesChecker";
import CustomButton from "../Buttons/CustomButton/CustomButton";
import EffectIndicator from "../EffectIndicator/EffectIndicator";
import { useGameVarsStore } from "../../stores/gameVars";
import { updatePlayerData } from "../../../api/apiFns";
import { useToastError } from "../../hooks/notifications";
import GameMapActionsBtn from "../Buttons/GameMapActionsBtn/GameMapActionsBtn";

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
const GameSideBar = lazy(() => import("../GameSideBar/GameSideBar"));

type MapTypes = "town" | "world";

const Game = () => {
  const shouldShow = UseLandscape();
  const [loading, setLoading] = useState(true);
  const [mapToDisplay, setMapToDisplay] = useState<MapTypes>("town");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const [isInvModalOpen, setIsInvModalOpen] = useState(false);
  const [isCraftModalOpen, setIsCraftModalOpen] = useState(false);

  const { showError } = useToastError();

  const player = useGameVarsStore((state) => state.player);
  const setAllWorkers = useGameVarsStore((state) => state.setAllWorkers);
  const setConcreteGathRate = useGameVarsStore(
    (state) => state.setConcreteGathRate
  );
  const setMetalsGathRate = useGameVarsStore(
    (state) => state.setMetalsGathRate
  );
  const setCrystalsGathRate = useGameVarsStore(
    (state) => state.setCrystalsGathRate
  );
  const setDieselGathRate = useGameVarsStore(
    (state) => state.setDieselGathRate
  );

  const gameWorker = useRef<Worker | null>(null);
  const gameLoopTick = useRef(0);

  // const testSPCard = SPCard.createNew({
  //   ownerId: 1,
  //   playerName: "test",
  //   templateId: 301,
  // });
  // testSPCard.id = 1;

  // const activeEffect = new EffectClass(testSPCard, Date.now() + effectDuration);
  const activeEffect = useGameVarsStore((state) => state.activeEffect);

  // const navigate = useNavigate();

  const auth = useRequireAuth();

  const { setNewGameState, getGameState, needsCatchUp, calcTimeUnits } =
    useGameLoop();
  const { energyChecker, maintenanceSubtracker, hasEffectExpired } =
    useValuesChecker();

  // If not authenticated, nothing will be rendered and user will be redirected
  function gameLoopRunner(
    /* currentGameState: IGameLoopWorkerInput */ catchUpLoops?: number
  ) {
    const currentGameState = getGameState(catchUpLoops ? catchUpLoops : 1);
    console.log("🎮 [Game.tsx] OLD - GameState: ", currentGameState);
    gameWorker.current?.postMessage(currentGameState);
  }

  useEffect(() => {
    // Initialize the worker
    gameWorker.current = new GameWorker();
    const requiresCatchUp = needsCatchUp();

    if (requiresCatchUp) {
      hasEffectExpired();
      const catchUpLoops = calcTimeUnits();
      console.log("🎮 [Game.tsx] Needs Catch Up: ", needsCatchUp());
      gameLoopRunner(catchUpLoops);
    }

    gameWorker.current.onmessage = (
      event: MessageEvent<gameLoopWorkerReturnType>
    ) => {
      const { wasSuccess, newState, actionMessage } = event.data;
      console.log("UseEffect: GameWorker.onmessage: ", event.data);

      if (wasSuccess) {
        hasEffectExpired();
        energyChecker(); //
        const { expense } = maintenanceSubtracker(); // TODO: if catchUpisRequired, subtrack the relevant values currently only subtracks once
        const stateAfterExpenses = {
          ...newState,
          newGold: newState.newGold - expense,
        };

        if (actionMessage === "reset workers") {
          console.log(
            "%c🎮 - ⛔ - [Game.tsx] Resetting Workers",
            "font-size: 20px; color: red;"
          );

          showError(
            "Workers Reset",
            "Because your Citizens are unhappy some left. Thus, you have to re-assign wokers."
          );

          setAllWorkers({
            privateSector: newState.newPopulation,
            concreteWorkers: 0,
            metalsWorkers: 0,
            crystalsWorkers: 0,
            dieselWorkers: 0,
            hospitalWorkers: 0,
          });

          setConcreteGathRate(0);
          setMetalsGathRate(0);
          setCrystalsGathRate(0);
          setDieselGathRate(0);

          if (
            player === null ||
            player === undefined ||
            player.id === null ||
            player.id === undefined
          )
            throw new Error(
              "⛔ - Game.tsx: GameLoop UseEffect: Player or Player ID is null or undefined!"
            );

          updatePlayerData(player.id, {
            workers_concrete: 0,
            workers_metals: 0,
            workers_crystals: 0,
            workers_diesel: 0,
            workers_hospital: 0,
          });
        }

        // Update your game state or Zustand store here based on `newState`
        console.log("🎮 [Game.tsx] New - State: ", stateAfterExpenses);
        console.log(" ---------------------------------------");

        setNewGameState({ ...stateAfterExpenses });
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
    // }, gamePace * 1000); // 5 sec

    return () => {
      // Terminate the worker when the component unmounts
      gameWorker.current?.terminate();
      // clearInterval(gameLoopInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameLoopTick.current]);

  useEffect(() => {
    const handleBeforeUnload = (event: { returnValue: string }) => {
      alert("If you refresh this page, the game will crash.");
      const message = "If you refresh this page, the game will crash.";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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

              <GameSideBar
                isOpen={isSideBarOpen}
                setIsOpen={setIsSideBarOpen}
                changeMap={() =>
                  setMapToDisplay((prev) =>
                    prev === "world" ? "town" : "world"
                  )
                }
                openCardCraftingModal={() => {
                  setIsInvModalOpen(false);
                  setIsCraftModalOpen(true);
                }}
                openInventoryModal={() => {
                  setIsCraftModalOpen(false);
                  setIsInvModalOpen(true);
                }}
              />

              {/* <div className="z-[401] fixed top-12 right-20">
                <GameButton
                  onClick={() => setIsSideBarOpen(true)}
                  text="Open Sidebar"
                  btnType="primary"
                />
              </div> */}

              <div className="z-[401] fixed top-6 right-6">
                <GameMapActionsBtn
                  size="small"
                  text="Actions"
                  onClick={() => setIsSideBarOpen(true)}
                />
              </div>

              <CraftCardModal
                isCraftModalOpen={isCraftModalOpen}
                setIsCraftModalOpen={setIsCraftModalOpen}
              />
              <InventoryModal
                isInvModalOpen={isInvModalOpen}
                setIsInvModalOpen={setIsInvModalOpen}
              />

              <div className="z-[401] absolute top-4 left-[280px]">
                <CustomButton
                  title="Run Loop"
                  handleClick={() => gameLoopRunner()}
                />
              </div>
              {activeEffect && (
                <div className="z-[401] absolute top-4 left-[120px]">
                  <EffectIndicator activeEffect={activeEffect} />
                </div>
              )}

              {/* 

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

              <div className="z-[401] absolute top-24 left-[280px]">
                <CustomButton
                  title="Run 500x Loops"
                  handleClick={() => gameLoopRunner(500)}
                />
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
              */}

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
