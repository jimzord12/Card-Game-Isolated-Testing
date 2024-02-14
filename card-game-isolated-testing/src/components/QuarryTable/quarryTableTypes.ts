export interface QuarryTableProps {}

export interface QuarryTableRawDataDB {
  id: number;
  playerName: string;
  workers: number;
  donations: number;
}

export interface QuarryTableData {
  player: string;
  workers: number;
  donations: number;
}

export interface QuarryTableColumnData {
  dataKey: keyof QuarryTableData;
  label: string;
  numeric?: boolean;
  width: number;
}

export type QuarryTableEntry = [];
