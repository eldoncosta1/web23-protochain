import Validation from "src/lib/validation";

/**
 * Mocked block class
 */
export class Block {
  private index: number;
  private timestamp: number;
  private hash: string;
  private previousHash: string;
  private data: string;

  /**
   * Creates a new mock block
   * @param block The mock block data
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
    return this.hash || "abc";
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
   * Validates the mock block
   * @returns Returns true if the block is valid
   */
  public isValid(previousHash: string, previousIndex: number): Validation {
    if (!previousHash || previousIndex < 0 || this.index < 0)
      return new Validation(false, "Invalid mock block");

    return new Validation();
  }
}
