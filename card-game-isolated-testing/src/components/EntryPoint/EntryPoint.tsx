import { BrowserRouter, Route, Routes } from "react-router-dom";
// import WorldMap from "../WorldMap/WorldMap";
import Game from "../Game/Game";
import Marketplace from "../../pages/Marketplace/Marketplace";
import Leaderboard from "../../pages/Leaderboard/Leaderboard";
import AuthProvider from "../../context/AuthContext/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePagePOC from "../Utility/HomePagePOC";

const queryClient = new QueryClient();

const EntryPoint = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePagePOC />} />
            {/* START - The Routes below are protected by the: useRequireAuth hook */}
            <Route path="/game" element={<Game />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            {/* END - The Routes above are protected by the: useRequireAuth hook */}
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default EntryPoint;
