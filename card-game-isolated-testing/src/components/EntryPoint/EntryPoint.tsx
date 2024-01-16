// import WorldMap from "../WorldMap/WorldMap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../../context/AuthContext/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePagePOC from "../Utility/HomePagePOC";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
// import Leaderboard from "../../pages/Leaderboard/Leaderboard";
// import Marketplace from "../../pages/Marketplace/src/Marketplace";
import Game from "../Game/Game";
// import WorldMap from "../../pages/Maps/WorldMap/WorldMap";
// import TownMap from "../../pages/Maps/TownMap/TownMap";
import NotFoundPage from "../../pages/NotFound/NotFound";

const queryClient = new QueryClient();

//TODO: Add <Suspense fallback={<LoadingPage />}> to the Routes below
//TODO: Use dynamic imports for the Routes below. This will allow for code splitting and faster load times.

const Marketplace = React.lazy(
  () => import("../../pages/Marketplace/src/Marketplace")
);
const Leaderboard = React.lazy(
  () => import("../../pages/Leaderboard/Leaderboard")
);
// const Game = React.lazy(() => import("../Game/Game")); ✨ Temporarily disabled ✨

const EntryPoint = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider disableForTesting>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePagePOC />} />
              {/* START - The Routes below are protected by the: useRequireAuth hook */}
              <Route path="game" element={<Game />}>
                {/* <Route path="townMap" element={<TownMap />} />
                <Route path="worldMap" element={<WorldMap />} /> */}
              </Route>
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              {/* END - The Routes above are protected by the: useRequireAuth hook */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default EntryPoint;
