import React from "react";
import { Route, Routes } from "react-router-dom";

import { StateContextProvider } from "./context";
import { Sidebar, Navbar } from "./components";
import {
  CardDetails,
  /*CreateCampaign,*/ Home,
  Profile,
  Withdraw,
} from "./pages";
import ErrorBoundary from "../../../components/ErrorBoundry/ErrorBoundry";
import useGA4 from "../../../hooks/useGA4";

const Marketplace = () => {
  useGA4();
  return (
    <ErrorBoundary>
      <StateContextProvider>
        <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
          <div className="sm:flex hidden mr-10 relative">
            <Sidebar />
          </div>

          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/withdraw" element={<Withdraw />} />
              {/* <Route path="/create-campaign" element={<CreateCampaign />} /> */}
              <Route
                path="marketplace/card-details/:id"
                element={<CardDetails />}
              />
              {/* ⛔ This Route Probably is falsy  */}
              <Route
                path="/profile/marketplace/card-details/:id"
                element={<CardDetails />}
              />
              {/* ✅ This is the route that allows the user to remove the card from the marketplace  */}
              <Route
                path="profile/card-details/:id"
                element={<CardDetails />}
              />
            </Routes>
          </div>
        </div>
      </StateContextProvider>
    </ErrorBoundary>
  );
};

export default Marketplace;
