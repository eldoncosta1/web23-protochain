import { vi } from "vitest";
import { Block } from "./block";
import { Blockchain } from "./blockchain";

vi.mock("./block", async () => {
  return await import("../src/__mocks__/block.mock");
});

describe("Blockchain tests", () => {
  it("should has genesis blocks", () => {
    const blockchain = new Blockchain();
    expect(blockchain.getBlocks().length).toBe(1);
  });

  it("should be valid (genesis)", () => {
    const blockchain = new Blockchain();
    expect(blockchain.isValid().success()).toBeTruthy();
  });

  it("should be valid (two blocks)", () => {
    const blockchain = new Blockchain();
    blockchain.addBlock(
      new Block({
        index: 1,
        previousHash: blockchain.getBlocks()[0].getHash(),
        data: "block 2",
      } as unknown as Block)
    );
    expect(blockchain.isValid().success()).toBeTruthy();
  });

  it("should not be valid", () => {
    const blockchain = new Blockchain();
    blockchain.addBlock(
      new Block({
        index: 1,
        previousHash: blockchain.getBlocks()[0].getHash(),
        data: "block 2",
      } as unknown as Block)
    );
    blockchain.getBlocks()[1].setIndex(-1);
    expect(blockchain.isValid().success()).toBeFalsy();
  });

  it("should add block", () => {
    const blockchain = new Blockchain();
    const result = blockchain.addBlock(
      new Block({
        index: 1,
        previousHash: blockchain.getBlocks()[0].getHash(),
        data: "block 2",
      } as unknown as Block)
    );
    expect(result.success()).toBe(true);
  });

  it("should not add block", () => {
    const blockchain = new Blockchain();
    const block = new Block({
      index: -1,
      previousHash: blockchain.getBlocks()[0].getHash(),
      data: "block 2",
    } as unknown as Block);
    const result = blockchain.addBlock(block);
    expect(result.success()).toBe(false);
  });

  it("should get block", () => {
    const blockchain = new Blockchain();
    const block = blockchain.getBlockByHash(
      blockchain.getBlocks()[0].getHash()
    );
    expect(block).toBeTruthy();
  });
});
