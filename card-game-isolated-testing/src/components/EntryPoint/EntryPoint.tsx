// import WorldMap from "../WorldMap/WorldMap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../../context/AuthContext/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import HomePagePOC from "../Utility/HomePagePOC";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
import NotFoundPage from "../../pages/NotFound/NotFound";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";

const queryClient = new QueryClient();

const HomePagePOC = React.lazy(
  () => import("../../pages/HomePage/HomePagePOC")
);

const Marketplace = React.lazy(
  () => import("../../pages/Marketplace/src/Marketplace")
);
const Leaderboard = React.lazy(
  () => import("../../pages/Leaderboard/Leaderboard")
);
const Game = React.lazy(() => import("../Game/Game"));

const EntryPoint = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider /*disableForTesting*/>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<HomePagePOC />} />
              {/* START - The Routes below are protected by the: useRequireAuth hook */}
              <Route path="game" element={<Game />} />
              <Route path="marketplace/*" element={<Marketplace />} />
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
