import { GiClick } from "react-icons/gi";
import { playerActionsLabel } from "../../../assets/gameMap/index";
import BtnWIthLeaves from "./Parts/BtnWIthLeaves";

interface GameMapActionsBtnProps {
  size: "small" | "medium" | "large";
  text: string;
  onClick: () => void;
}

const GameMapActionsBtn = ({ size, text, onClick }: GameMapActionsBtnProps) => {
  let btnSize = "w-44 h-20";
  let iconSize = 24;
  switch (size) {
    case "small":
      break;
    case "medium":
      btnSize = "w-56 h-56";
      iconSize = 32;
      break;
    case "large":
      btnSize = "w-64 h-64";
      iconSize = 40;
      break;

    default:
      break;
  }

  return (
    <div
      className={`relative flex justify-center items-center ${btnSize} shadow-[0_10px_60px_5px_yellow] 
    hover:shadow-[0_10px_60px_5px_limegreen] transition-all duration-600 ease-in-out`}
    >
      <img
        className="absolute h-full w-full "
        src={playerActionsLabel}
        alt="Player-Actions-GameMap-Btn"
      />
      <div className="flex justify-center items-center">
        {/* <GiClick size={iconSize} style={{ zIndex: 1 }} /> */}
        <BtnWIthLeaves text={text} onClick={onClick} />
      </div>
    </div>
  );
};

export default GameMapActionsBtn;
