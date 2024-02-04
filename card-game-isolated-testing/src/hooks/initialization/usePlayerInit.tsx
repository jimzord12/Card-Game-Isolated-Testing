import { useGameVarsStore } from "../../stores/gameVars";
import { Level } from "../../types";
import { IPlayerDB } from "../../types/PlayerTypes/Player";

const usePlayerInit = () => {
  const { setPlayer, setTownhallLevel, setFactoryLevel } = useGameVarsStore(
    (state) => state
  );

  const playerInit = (data: IPlayerDB) => {
    setPlayer(data); // 🔷 Set the Player Data to Global State
    setTownhallLevel(data.townhall_lvl as Level);
    setFactoryLevel(data.factory_lvl as Level);
  };

  return { playerInit };
};

export default usePlayerInit;
