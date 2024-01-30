export interface IPlayerDB {
  id: number;
  name: string;
  wallet: string;
  password: string;
  townhall_lvl: number;
  island_id: number | null;
  workers_concrete: number | null;
  workers_metals: number | null;
  workers_crystals: number | null;
  taxes: number | null;
  voteCasted: number | null;
  concrete: number | null;
  metals: number | null;
  crystals: number | null;
  population: number | null;
  diesel: number | null;
  gold: number | null;
  alliance: number | null;
  rank: number | null;
  grp: number | null;
  refreshToken: string | null;
  timestamp: string | null;
  lastETHtransfer: string | null; // Assuming mySQL timestamp can be represented as a JavaScript Date object
}

export type PlayerData = Pick<
  IPlayerDB,
  | "id"
  | "island_id"
  | "townhall_lvl"
  | "workers_concrete"
  | "workers_metals"
  | "workers_crystals"
  | "concrete"
  | "metals"
  | "diesel"
  | "crystals"
  | "gold"
  | "population"
  | "rank"
  | "timestamp"
>;
