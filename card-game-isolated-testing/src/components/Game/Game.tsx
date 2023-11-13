import ModalProvider from "../../context/ModalContext/ModalProvider";
import TownMap from "../TownMap/TownMap";

const Game = () => {
  return (
    <div>
      <ModalProvider>
        <TownMap />
      </ModalProvider>
    </div>
  );
};

export default Game;
