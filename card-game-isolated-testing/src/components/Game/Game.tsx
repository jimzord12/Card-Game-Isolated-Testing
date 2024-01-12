import ModalProvider from "../../context/ModalContext/ModalProvider";
import UseLandscape from "../../hooks/useLandscape";
import RotateDevice from "../RotateDevice/RotateDevice";
import TownMap from "../TownMap/TownMap";

const Game = () => {
  const shouldShow = UseLandscape();

  return (
    <div>
      <RotateDevice show={shouldShow} />
      <ModalProvider>
        <TownMap />
      </ModalProvider>
    </div>
  );
};

export default Game;
