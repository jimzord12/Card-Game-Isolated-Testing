import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./gameButton.css";
import { Dispatch, SetStateAction } from "react";
// import { useNavigate } from "react-router-dom";
// import { usePlayerContext } from '../../context/playerContext/PlayerContext';

interface GameButtonProps {
  btnType: string;
  text: string;
  // action?: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void | Dispatch<SetStateAction<boolean>>;
}

export default function GameButton({
  btnType = "primary",
  text,
  onClick,
}: // action,
GameButtonProps) {
  //   const navigate = useNavigate();
  //   const {
  //     setTestingMode,
  //     setForceRerender,
  //     dispatch,
  //     setCatchUp,
  //     setFakeDate,
  //   } = usePlayerContext();

  //   const handleAction = (actionName, cb) => {
  //     if (actionName === "Inventory") {
  //       // setIsInventoryOpen(true);
  //       cb(true);
  //       // console.log('Modal should Open!', callback);
  //     } else {
  //       console.log(actionName);
  //     }

  //     if (actionName === "Maps") {
  //       navigate("/battleground");
  //     } else {
  //       console.log(actionName);
  //     }

  //     if (actionName === "Marketplace") {
  //       navigate("/marketplace");
  //     } else {
  //       console.log(actionName);
  //     }

  //     if (actionName === "Craft") {
  //       cb(true);
  //     } else {
  //       console.log(actionName);
  //     }

  //     if (actionName === "Leaderboard") {
  //       // cb(true);
  //       navigate("/leaderboard");
  //     } else {
  //       console.log(actionName);
  //     }
  //   };

  return (
    <div onClick={onClick}>
      <AwesomeButton type={btnType}>{text}</AwesomeButton>
    </div>
  );
}
