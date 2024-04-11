import { Suspense, lazy, useEffect, useRef, useState } from "react";
import ModalProvider from "../../context/ModalContext/ModalProvider";
import UseLandscape from "../../hooks/useLandscape";
import RotateDevice from "../RotateDevice/RotateDevice";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";
import { useRequireAuth } from "../../hooks/auth/useRequiresAuth";
// import CustomButton from "../Buttons/CustomButton/CustomButton";
// import { useNavigate } from "react-router-dom";
// import GameButton from "../Buttons/GameButton/GameButton";
// import StatsBars from "../StatsBars/StatsBars";
import GameWorker from "../../webWorkers/gameLoopWorker.worker?worker";
import {
  IGameLoopWorkerInput,
  gameLoopWorkerReturnType,
} from "../../types/GameLoopTypes/GameLoopTypes";
import useGameLoop from "../../hooks/game/gameLoop/useGameLoop";
import useValuesChecker from "../../hooks/game/gameLoop/useValuesChecker";
// import CustomButton from "../Buttons/CustomButton/CustomButton";
import EffectIndicator from "../EffectIndicator/EffectIndicator";
import { useGameVarsStore } from "../../stores/gameVars";
import {
  awardMGS,
  getPlayerByWallet,
  updatePlayerData,
} from "../../../api/apiFns";
import { useToastError } from "../../hooks/notifications";
import GameMapActionsBtn from "../Buttons/GameMapActionsBtn/GameMapActionsBtn";
import { gameConfig } from "../../constants/game";
import useGA4 from "../../hooks/useGA4";
import { useAuth } from "../../hooks/auth/useAuth";
import { useAllCardsStore } from "../../stores/allCards";
import { useGeneralVariablesStore } from "../../stores/generalVariables";
import { createJSCards } from "../../utils/game/createJSCards";
import { useBlockchainStore } from "../../stores/blockchainStore";
import { useRewardingToolContract } from "../../hooks/blockchain/useRewardingToolContract";
import { useGameContract } from "../../hooks/blockchain/useGameContract";
// import type { Contract } from "ethers/contract";

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

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const Game = () => {
  useGA4();
  const shouldShow = UseLandscape();
  const [loading, setLoading] = useState(true);
  const [mapToDisplay, setMapToDisplay] = useState<MapTypes>("town");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const [isInvModalOpen, setIsInvModalOpen] = useState(false);
  const [isCraftModalOpen, setIsCraftModalOpen] = useState(false);

  // const [rewardingContract, setRewardingContract] = useState<
  //   Contract | undefined | null
  // >(null);
  // const [gameContract, setGameContract] = useState<Contract | undefined | null>(
  //   null
  // );
  const {
    initialize: initializeRTContract,
    // isLoading: isLoadingRTContract
  } = useRewardingToolContract();
  const {
    initialize: initializeGameContract,
    // isLoading: isLoadingGameContract,
  } = useGameContract();

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

  const [reRenderCounters, setReRenderCounters] = useState(0);

  const gameWorker = useRef<Worker | null>(null);
  const gameLoopTick = useRef(0);

  const activeEffect = useGameVarsStore((state) => state.activeEffect);

  const auth = useRequireAuth();
  const { user } = useAuth();

  const localWallet = useBlockchainStore((state) => state.localWallet);
  const setRewardingToolContract = useBlockchainStore(
    (state) => state.setRewardingToolContract
  );
  const setGameContract = useBlockchainStore((state) => state.setGameContract);

  const isNewPlayer = useGeneralVariablesStore((state) => state.isNewPlayer);

  const addAllInventoryCards = useAllCardsStore(
    (state) => state.addAllInventoryCards
  );
  const removeAllInventoryCards = useAllCardsStore(
    (state) => state.removeAllInventoryCards
  );
  const refetchCards = useGeneralVariablesStore((state) => state);

  const { setNewGameState, getGameState, needsCatchUp, calcTimeUnits } =
    useGameLoop();
  const {
    energyChecker,
    maintenanceSubtracker,
    hasEffectExpired,
    factoryChecker,
  } = useValuesChecker();

  // If not authenticated, nothing will be rendered and user will be redirected
  function gameLoopRunner(currentGameState: IGameLoopWorkerInput) {
    // const currentGameState = getGameState(catchUpLoops ? catchUpLoops : 1);
    console.log("🎮 [Game.tsx] OLD - GameState: ", currentGameState);
    gameWorker.current?.postMessage(currentGameState);
  }

  // For the Game Loop
  useEffect(() => {
    // Initialize the worker
    gameWorker.current = new GameWorker();
    const requiresCatchUp = needsCatchUp();

    if (requiresCatchUp) {
      hasEffectExpired();
      const catchUpLoops = calcTimeUnits();
      const currentGameStateCatchUp = getGameState(
        catchUpLoops ? catchUpLoops : 1
      );
      console.log("🎮 [Game.tsx] Needs Catch Up: ", needsCatchUp());
      console.log("🎮 [Game.tsx] Number of Loops: ", catchUpLoops);
      gameLoopRunner(currentGameStateCatchUp);
    }

    gameWorker.current.onmessage = (
      event: MessageEvent<gameLoopWorkerReturnType>
    ) => {
      const { wasSuccess, newState, actionMessage } = event.data;
      console.log("UseEffect: GameWorker.onmessage: ", event.data);

      if (wasSuccess) {
        console.log("AAAAAAAAAAAAAAAAAAAAAAA");
        hasEffectExpired();
        factoryChecker();
        energyChecker(); //
        maintenanceSubtracker(); // TODO: if catchUpisRequired, subtrack the relevant values currently only subtracks once
        const stateAfterExpenses = {
          ...newState,
          newGold: newState.newGold,
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

        // 🔷 Try to update the DB using the "updatePlayerData" api function.

        // Update your game state or Zustand store here based on `newState`
        console.log("🎮 [Game.tsx] New - State: ", stateAfterExpenses);
        console.log(" ---------------------------------------");

        setNewGameState({ ...stateAfterExpenses });
        gameLoopTick.current += 1; // ✨ Uncomment after testing
      } else {
        throw new Error(
          "⛔ Game.tsx: Game Loop Worker failed to process the game state"
        );
      }
    };

    // // Setup interval for game loop
    const gameLoopInterval = setInterval(() => {
      // ✨ Uncomment after testing
      const currentGameState = getGameState(1);
      gameLoopRunner(currentGameState); // ✨ Uncomment after testing
    }, gameConfig.gamePace * 1000); // 5 sec // ✨ Uncomment after testing

    return () => {
      // Terminate the worker when the component unmounts
      gameWorker.current?.terminate(); // ✨ Uncomment after testing
      clearInterval(gameLoopInterval); // ✨ Uncomment after testing
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameLoopTick.current]);

  // Web3 Init Staff
  useEffect(() => {
    console.log(" 🅱 (1) BLOCKCHAIN - INIT: User", user);
    console.log(" 🅱 (2) BLOCKCHAIN - INIT: LocalWallet", localWallet);
    if (window.ethereum || localWallet) {
      console.log("🅱 Step #1: Initializing Contracts");

      (async () => {
        // Rewarding Tool Contract
        try {
          // -> Local Wallet
          if (localWallet !== null && localWallet !== undefined) {
            console.log(
              "🅱 (LocalWallet) #1.1.1: Initializing Rewarding Tool Contract Instance..."
            );
            const _rewardingContract = await initializeRTContract(
              true,
              localWallet
            );
            if (_rewardingContract === null || _rewardingContract === undefined)
              throw new Error(
                "⛔ Rewarding Tool Contract is null or undefined"
              );
            setRewardingToolContract(_rewardingContract);
            console.log(
              "🅱 (LocalWallet) #1.1.2: ✅ Rewarding Tool Contract Instance Completed!"
            );
            // -> MetaMask
          } else if (window.ethereum) {
            console.log(
              "🅱 (MetaMask) #1.1.3: Initializing Rewarding Tool Contract Instance..."
            );
            const _rewardingContract = await initializeRTContract();
            if (_rewardingContract === null || _rewardingContract === undefined)
              throw new Error(
                "⛔ Rewarding Tool Contract is null or undefined"
              );
            setRewardingToolContract(_rewardingContract);
            console.log(
              "🅱 (MetaMask) #1.1.4: ✅ Rewarding Tool Contract Instance Completed!"
            );
          } else {
            console.log(
              "🅱 - ⛔ | (No Error) Something went wrong while Initializing the Rewarding Tool Contract"
            );
            showError(
              "(No Error) Rewarding Tool Contract Problem",
              "Something went wrong while initializing the Rewarding Tool Contract"
            );
          }
        } catch (error) {
          console.error(
            "⛔ - 🅱 Cautch Error From: (Game.tsx), BLOCKCHAIN - useEffect: Rewarding Tool",
            error
          );
          showError(
            "Rewarding Tool Contract Error",
            "Something went wrong while initializing the Rewarding Tool Contract"
          );
        }

        // Game Contract
        try {
          // -> Local Wallet
          if (localWallet !== null && localWallet !== undefined) {
            console.log(
              "🅱 (LocalWallet) #1.2.1: Initializing Game Contract Instance..."
            );
            const _gameContract = await initializeGameContract(
              true,
              localWallet
            );
            if (_gameContract === null || _gameContract === undefined)
              throw new Error("⛔ Game Contract is null or undefined");

            setGameContract(_gameContract);
            console.log(
              "🅱 (LocalWallet) #1.2.2: ✅ Game Contract Instance Completed!"
            );

            if (isNewPlayer) {
              await _gameContract.createPlayer(player?.name, player?.id); // 🅱

              if (player?.wallet === null || player?.wallet === undefined)
                throw new Error("⛔ Player Wallet is null or undefined");
              await awardMGS(player?.wallet, 15); // 🅱
            }

            // -> MetaMask
          } else if (window.ethereum) {
            console.log(
              "🅱 (MetaMask) #1.2.3: Initializing Game Contract Instance..."
            );
            const _gameContract = await initializeGameContract();
            if (_gameContract === null || _gameContract === undefined)
              throw new Error("⛔ Game Contract is null or undefined");
            setGameContract(_gameContract);
            console.log(
              "🅱 (MetaMask) #1.2.4: ✅ Game Contract Instance Completed!"
            );

            if (isNewPlayer) {
              await _gameContract.createPlayer(player?.name, player?.id); // 🅱

              if (player?.wallet === null || player?.wallet === undefined)
                throw new Error("⛔ Player Wallet is null or undefined");
              await awardMGS(player?.wallet, 15); // 🅱
            }
          } else {
            console.log(
              "🅱 - ⛔ | (No Error) Something went wrong while Initializing the Game Contract"
            );
            showError(
              "(No Error) Game Contract Problem",
              "Something went wrong while initializing the Game Contract"
            );
          }
        } catch (error) {
          console.error(
            "⛔ - 🅱 Cautch Error From: (Game.tsx), BLOCKCHAIN - useEffect: Game Contract",
            error
          );
          showError(
            "Game Contract Error",
            "Something went wrong while initializing the Game Contract"
          );
        }
      })();
    } else {
      console.log(
        "🅱 - ⛔ | Contract Intialization Failed! Both Metamask and LocalWallet are null or undefined"
      );
      showError(
        "Contract Initialization Failed!",
        "Please Inform the Developer about this issue."
      );
    }
  }, [user, localWallet]);

  // Prevent the user from refreshing the page by accident
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

  useEffect(() => {
    let counter = 0;
    const fetchInvCards = async () => {
      if (refetchCards.shouldRefecthInvCards) {
        if (user?.wallet === null || user?.wallet === undefined)
          throw new Error("⛔ InventoryModal:UseEffect: Wallet is not defined");

        const playerData = await getPlayerByWallet(user?.wallet);
        const convertedFromDB_To_JS = createJSCards(playerData.cards); // 🔷 Convert the Cards from DB to JS

        const inventoryCards = convertedFromDB_To_JS.filter(
          (card) => card.state === false && card.forSale === false
        );
        addAllInventoryCards(inventoryCards); // 🔷 Updates Client State (Zustand)
      }
    };

    if (
      refetchCards.shouldRefecthInvCards &&
      reRenderCounters === 0 &&
      counter === 0
    ) {
      removeAllInventoryCards();
      console.log("asjiodnaojsdoads123123asddas");
      fetchInvCards();
      refetchCards.setShouldRefecthInvCards(false);
      setReRenderCounters(reRenderCounters + 1);
      counter += 1;
    }
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

              {/* <div className="z-[401] absolute top-4 left-[280px]">
                <CustomButton
                  title="Run Loop"
                  handleClick={() => {
                    gameLoopTick.current += 1;
                    gameLoopRunner(1);
                  }}
                />
              </div>

              <div className="z-[401] absolute top-[100px] left-[280px]">
                <CustomButton
                  title="Run 100x Loops"
                  handleClick={() => gameLoopRunner(100)}
                />
              </div> */}
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
