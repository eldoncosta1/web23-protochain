import { SHA256 } from "crypto-js";
import Validation from "./validation";
import { BlockInfo } from "./blockinfo";

/**
 * Block class
 */
export class Block {
  private index: number;
  private timestamp: number;
  private hash: string;
  private previousHash: string;
  private data: string;
  private nounce: number;
  private miner: string;

  /**
   * Creates a new block
   * @param block The block data
   */
  constructor(block?: Block) {
    this.index = block?.index || 0;
    this.timestamp = block?.timestamp || Date.now();
    this.previousHash = block?.previousHash || "";
    this.data = block?.data || "";
    this.nounce = block?.nounce || 0;
    this.miner = block?.miner || "";
    this.hash = block?.hash || this.getHash();
  }

  public setTimestamp(timestamp: number) {
    this.timestamp = timestamp;
  }

  public setHash(hash: string) {
    this.hash = hash;
  }

  public getHash(): string {
    return SHA256(
      this.index +
        this.data +
        this.timestamp +
        this.previousHash +
        this.nounce +
        this.miner
    ).toString();
  }

  public setPreviosHash(hash: string) {
    this.previousHash = hash;
  }

  public setIndex(index: number): void {
    this.index = index;
  }

  public getIndex(): number {
    return this.index;
  }

  public getData(): string {
    return this.data;
  }

  public setData(data: string) {
    this.data = data;
  }

  /**
   * Generates a new valid hash for this block with the specified difficulty
   * @param difficulty The blockchain current difficulty
   * @param miner  The miner wallet address
   */
  public mine(difficulty: number, miner: string) {
    this.miner = miner;
    const prefix = new Array(difficulty + 1).join("0");

    do {
      this.nounce++;
      this.hash = this.getHash();
    } while (!this.hash.startsWith(prefix));
  }

  /**
   * Validates the block
   * @param previousHash The previous block hash
   * @param previousIndex The index of the previous block
   * @param difficulty The blockchain current difficulty
   * @returns Returns true if the block is valid
   */
  public isValid(
    previousHash: string,
    previousIndex: number,
    difficulty: number
  ): Validation {
    if (previousIndex !== this.index - 1)
      return new Validation(false, "Invalid index");
    if (!this.data) return new Validation(false, "Invalid data");
    if (this.timestamp < 1) return new Validation(false, "Invalid timestamp");
    if (this.previousHash !== previousHash)
      return new Validation(false, "Invalid previous hash");
    if (!this.nounce || !this.miner) return new Validation(false, "No mined");

    const prefix = new Array(difficulty + 1).join("0");
    if (this.hash !== this.getHash() || !this.hash.startsWith(prefix))
      return new Validation(false, "Invalid hash");
    return new Validation();
  }

  /**
   * Create a block from blockinfo
   * @param blockInfo The block info
   * @returns A block
   */
  static getBlockfromBlockInfo(blockInfo: BlockInfo): Block {
    const block = new Block();
    block.setIndex(blockInfo.index);
    block.setPreviosHash(blockInfo.previousHash);
    block.setData(blockInfo.data);

    return block;
  }
}
