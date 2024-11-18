import { SHA256 } from "crypto-js";
import Validation from "./lib/validation";

/**
 * Block class
 */
export class Block {
  private index: number;
  private timestamp: number;
  private hash: string;
  private previousHash: string;
  private data: string;

  /**
   * Creates a new block
   * @param block The block data
   */
  constructor(block?: Block) {
    this.index = block?.index || 0;
    this.timestamp = block?.timestamp || Date.now();
    this.previousHash = block?.previousHash || "";
    this.data = block?.data || "";
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
      this.index + this.data + this.timestamp + this.previousHash
    ).toString();
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
   * Validates the block
   * @returns Returns true if the block is valid
   */
  public isValid(previousHash: string, previousIndex: number): Validation {
    if (previousIndex !== this.index - 1)
      return new Validation(false, "Invalid index");
    if (this.hash !== this.getHash())
      return new Validation(false, "Invalid hash");
    if (!this.data) return new Validation(false, "Invalid data");
    if (this.timestamp < 1) return new Validation(false, "Invalid timestamp");
    if (this.previousHash !== previousHash)
      return new Validation(false, "Invalid previous hash");

    return new Validation();
  }
}
