/**
 * The BlockInfo interface
 */
export interface BlockInfo {
  index: number;
  previousHash: string;
  difficulty: number;
  maxDifficulty: number;
  feePerTx: number;
  data: string;
}
