import { Block } from "../block";
import { BlockInfo } from "../blockinfo";
import Validation from "../validation";
/**
 * Mocked Blockchain class
 */
export class Blockchain {
  private blocks: Block[];
  private nextIndex = 0;

  /**
   * Creates a new mocked blockchain
   */
  constructor() {
    this.blocks = [
      new Block({
        index: 0,
        previousHash: "abc",
        data: "genesis",
        timestamp: Date.now(),
      } as unknown as Block),
    ];
    this.nextIndex++;
  }

  public getBlocks(): Block[] {
    return this.blocks;
  }

  public getBlockByHash(hash: string): Block | undefined {
    return this.blocks.find((b) => b.getHash() === hash);
  }

  public getLastBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  public addBlock(block: Block): Validation {
    if (block.getIndex() < 0)
      return new Validation(false, "Invalid mock block");

    this.blocks.push(block);
    this.nextIndex++;

    return new Validation();
  }

  public isValid(): Validation {
    return new Validation();
  }

  public getFeePerTx(): number {
    return 1;
  }

  public getNextBlock(): BlockInfo {
    return {
      data: new Date().toString(),
      difficulty: 0,
      previousHash: this.getLastBlock().getHash(),
      index: 1,
      feePerTx: this.getFeePerTx(),
      maxDifficulty: 62,
    };
  }
}
