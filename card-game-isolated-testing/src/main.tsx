import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReactGA from "react-ga4";

const isProduction = import.meta.env.MODE === "production";
const disableSW = true;

const measurementId = "G-GXWTBE5SFP"; // Replace this with your Measurement ID
ReactGA.initialize(measurementId);

// Send pageview with a custom path
ReactGA.send({ hitType: "pageview", page: "/my-path", title: "Custom Title" });

if ("serviceWorker" in navigator && !disableSW) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(isProduction ? "/sw.js" : "../swTest.ts")
      .then((registration) => {
        console.log(
          `${
            isProduction ? "PROD - " : "DEV - "
          }Service Worker registered with scope:`,
          registration.scope
        );
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
