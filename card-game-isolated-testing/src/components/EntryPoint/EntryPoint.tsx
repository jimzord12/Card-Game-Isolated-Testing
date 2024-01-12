import { BrowserRouter, Route, Routes } from "react-router-dom";
// import WorldMap from "../WorldMap/WorldMap";
import Game from "../Game/Game";
import HomePage from "../../pages/HomePage/HomePage";
import Marketplace from "../../pages/Marketplace/Marketplace";
import Leaderboard from "../../pages/Leaderboard/Leaderboard";
import AuthProvider from "../../context/AuthContext/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const EntryPoint = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* The Routes below are protected by the: useRequireAuth hook */}
            <Route path="/game" element={<Game />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default EntryPoint;
