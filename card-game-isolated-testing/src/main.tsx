import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const isProduction = import.meta.env.MODE === "production";

if ("serviceWorker" in navigator) {
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
