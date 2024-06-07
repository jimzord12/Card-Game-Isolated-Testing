// ✨ Frontend Game - Version
import axios from "axios";

const isProduction = import.meta.env.VITE_IS_PRODUCTION == "yes";
const isWSLocal = !isProduction && import.meta.env.VITE_IS_LOCAL_WS == "yes";
const isDocker = import.meta.env.VITE_IS_DOCKER == "yes";

const webServerURL = import.meta.env.VITE_WEB_SERVER_URL;
const webServerPort = import.meta.env.VITE_WEB_SERVER_PORT;

let HOST;

if (!isDocker && !isWSLocal) {
  HOST = "https://genera-game-express-server.onrender.com/";
} else {
  HOST = `${webServerURL}:${webServerPort}/`;
}

console.log("🧪 1 - Api Config: isProduction: ", isProduction);
console.log("🧪 2 - Api Config: isWSLocal: ", isWSLocal);
console.log("🧪 3 - Api Config: isDocker 🐳: ", isDocker);
console.log("🧪 4 - Api Config: Web Server URL: ", webServerURL);
console.log("🧪 5 - Api Config: Web Server Port: ", webServerPort);
// const isWSLocal = false;

// const PORT = 3333; // Local port
console.log(
  `💎🎉😓 You are in [${isWSLocal ? "DEV MODE" : "PRODUCTION MODE"}] 💎🎉😓`
);
// const PORT = 29352;
// const HOST = isWSLocal
//   ? `${webServerURL}:${webServerPort}/`
//   : //  : 'https://genera-game-backend-v2.herokuapp.com/';
//     "https://genera-game-express-server.onrender.com/";

console.log("🚀 - API Config: HOST: ", HOST);

export const axiosPublic = axios.create({
  baseURL: HOST,
  // baseURL: `http://localhost:${PORT}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axios.create({
  baseURL: HOST,
  // baseURL: `http://localhost:${PORT}`,
  headers: { "Content-Type": "application/json", Authorization: "" },
  withCredentials: true,
});
