import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./gameButton.css";
// import { useNavigate } from "react-router-dom";
// import { usePlayerContext } from '../../context/playerContext/PlayerContext';

interface GameButtonProps {
  type: string;
  text: string;
  action: () => void;
}

export default function GameButton({
  type = "primary",
  text,
  action,
}: GameButtonProps) {
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
    <AwesomeButton type={type} onPress={() => action}>
      {text}
    </AwesomeButton>
  );
}
