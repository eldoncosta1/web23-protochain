import { Block } from "./block";
import Validation from "./lib/validation";
/**
 * Blockchain class
 */
export class Blockchain {
  private blocks: Block[];
  private nextIndex = 0;

  /**
   * Creates a new blockchain
   */
  constructor() {
    this.blocks = [
      new Block({
        index: this.nextIndex,
        previousHash: "",
        data: "genesis",
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
    const lastBlock = this.getLastBlock();

    const validation = block.isValid(lastBlock.getHash(), lastBlock.getIndex());
    if (!validation.success())
      return new Validation(false, `Invalid block. ${validation.message()}`);

    this.blocks.push(block);
    this.nextIndex++;
    return new Validation();
  }

  public isValid(): Validation {
    for (let i = this.blocks.length - 1; i > 0; i--) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      const validation = currentBlock.isValid(
        previousBlock.getHash(),
        previousBlock.getIndex()
      );
      if (!validation.success())
        return new Validation(
          false,
          `Invalid block #${currentBlock.getIndex()}: ${validation.message()}`
        );
    }

    return new Validation();
  }
}
