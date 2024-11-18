export interface IBlock {
  getHash(): string;
  setData(data: string): void;
  setTimestamp(timestamp: number): void;
  getHash(): string;
  getIndex(): number;
  getData(): string;
}
