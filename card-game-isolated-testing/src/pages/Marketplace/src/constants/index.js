import { dashboard, profile, withdraw } from "../assets";

import {
  templateIdToTemplateDataBuilding,
  templateIdToTemplateDataREG,
  templateIdToTemplateDataSP,
} from "../../../../constants/templates";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/marketplace",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/marketplace/profile",
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/marketplace/withdraw",
  },
];

// TODO_DONE ✅: Add the New Cards here!
// FROM:
//    - card-game-isolated-testing\src\constants\templates\buildings.ts
//    - card-game-isolated-testing\src\constants\templates\regs.ts
//    - card-game-isolated-testing\src\constants\templates\sps.ts

// The keys (numbers) represent the Cards Template IDs
export const cardInfo = {
  // Building Templates
  101: templateIdToTemplateDataBuilding[101], // Tool Store
  102: templateIdToTemplateDataBuilding[102], // Amusement Park
  103: templateIdToTemplateDataBuilding[103], // Hospital
  104: templateIdToTemplateDataBuilding[104], // Radio Station

  // REG Templates
  201: templateIdToTemplateDataREG[201], // Simple Wind Turbine
  202: templateIdToTemplateDataREG[202], // Super Wind Turbine
  203: templateIdToTemplateDataREG[203], // Simple Solar Panel
  204: templateIdToTemplateDataREG[204], // Super Solar Panel

  // SP Templates
  301: templateIdToTemplateDataSP[301], // WallStreet
  302: templateIdToTemplateDataSP[302], // Love App
  303: templateIdToTemplateDataSP[303], // Super Strong
};

export const islands = [
  {
    id: 1,
    name: "Ibiza",
    position: [38.9588, 1.4327],
    info: "Info about Ibiza",
  },
  {
    id: 2,
    name: "Mykonos",
    position: [37.4467, 25.3689],
    info: "Info about Mykonos",
  },
  {
    id: 3,
    name: "Santorini",
    position: [36.3932, 25.4615],
    info: "Info about Santorini",
  },
  {
    id: 4,
    name: "Sardinia",
    position: [39.8277, 9.111111],
    info: "Sardinia is the second-largest island in the Mediterranean after Sicily. Sardinia has a rich history and culture that dates back thousands of years. The island has been inhabited since prehistoric times, and it has been ruled by various civilizations. It is a unique and fascinating destination with something to offer for everyone.",
  },
  {
    id: 5,
    name: "Crete",
    position: [35.2074, 24.83],
    info: "Info about Crete",
  },
  {
    id: 6,
    name: "Cyprus",
    position: [35.0951, 33.2034],
    info: "Info about Cyprus",
  },
  // Add more islands as needed
];

export const searchTerms = ["wind turbine", "techstore", "workaholism"];
