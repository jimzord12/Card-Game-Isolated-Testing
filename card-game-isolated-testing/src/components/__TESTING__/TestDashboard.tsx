import Button from "@mui/material/Button/Button";
import { Link } from "react-router-dom";
import TestInputField from "./TestInputField";

const TestDashboard = () => {
  return (
    <div className="flex xl:flex-col flex-col relative gap-4 bg-neutral-600 items-center">
      <h1 style={{ fontSize: 36 }}> 🧪 TESTING PAGES 🧪 </h1>
      <Link to="/game">
        <Button variant="contained">Go to Game</Button>
      </Link>
      <Link to="/marketplace">
        <Button variant="contained">Go to MarketPlace</Button>
      </Link>
      <Link to="/leaderboard">
        <Button variant="contained">Go to Leaderboard</Button>
      </Link>
      <h1 style={{ fontSize: 26 }}> ✨ Hardcoded Values ✨ </h1>
      <p style={{ fontSize: 22 }}>1. Player Data</p>
      <TestInputField />
    </div>
  );
};

export default TestDashboard;
