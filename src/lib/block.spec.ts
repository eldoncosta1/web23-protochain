import { Block } from "./block";

describe("Block Tests", () => {
  const exampleDifficulty = 2;
  const exampleMiner = "eldon";
  let genesisBlock: Block;

  beforeAll(() => {
    genesisBlock = new Block({ data: "genesis block" } as unknown as Block);
  });

  it("should be valid", () => {
    const block = new Block({
      index: 1,
      previousHash: genesisBlock.getHash(),
      data: "block 2",
    } as unknown as Block);
    block.mine(exampleDifficulty, exampleMiner);
    const valid = block.isValid(
      genesisBlock.getHash(),
      genesisBlock.getIndex(),
      exampleDifficulty
    );
    expect(valid.success()).toBeTruthy();
  });

  it("should not be valid (fallbacks)", () => {
    const block = new Block();
    const valid = block.isValid(
      genesisBlock.getHash(),
      genesisBlock.getIndex(),
      exampleDifficulty
    );
    expect(valid.success()).toBeFalsy();
  });

  it("should not be valid (previous hash)", () => {
    const block = new Block({
      index: 1,
      previousHash: "abc",
      data: "block 2",
    } as unknown as Block);
    const valid = block.isValid(
      genesisBlock.getHash(),
      genesisBlock.getIndex(),
      exampleDifficulty
    );
    expect(valid.success()).toBeFalsy();
  });

  it("should not be valid (timestamp)", () => {
    const block = new Block({
      index: 1,
      previousHash: genesisBlock.getHash(),
      data: "block 2",
    } as unknown as Block);
    block.setTimestamp(-1);
    block.setHash(block.getHash());
    const valid = block.isValid(
      genesisBlock.getHash(),
      genesisBlock.getIndex(),
      exampleDifficulty
    );
    expect(valid.success()).toBeFalsy();
  });

  it("should not be valid (empty hash)", () => {
    const block = new Block({
      index: 1,
      previousHash: genesisBlock.getHash(),
      data: "block 2",
    } as unknown as Block);
    block.mine(exampleDifficulty, exampleMiner);
    block.setHash("");
    const valid = block.isValid(
      genesisBlock.getHash(),
      genesisBlock.getIndex(),
      exampleDifficulty
    );
    expect(valid.success()).toBeFalsy();
  });

  it("should not be valid (no mined)", () => {
    const block = new Block({
      index: 1,
      previousHash: genesisBlock.getHash(),
      data: "block 2",
    } as unknown as Block);
    const valid = block.isValid(
      genesisBlock.getHash(),
      genesisBlock.getIndex(),
      exampleDifficulty
    );
    expect(valid.success()).toBeFalsy();
  });

  it("should not be valid (data)", () => {
    const block = new Block({
      index: 1,
      previousHash: genesisBlock.getHash(),
      data: "",
    } as unknown as Block);
    const valid = block.isValid(
      genesisBlock.getHash(),
      genesisBlock.getIndex(),
      exampleDifficulty
    );
    expect(valid.success()).toBeFalsy();
  });

  it("should not be valid (index)", () => {
    const block = new Block({
      index: -1,
      previousHash: genesisBlock.getHash(),
      data: "block 2",
    } as unknown as Block);
    const valid = block.isValid(
      genesisBlock.getHash(),
      genesisBlock.getIndex(),
      exampleDifficulty
    );
    expect(valid.success()).toBeFalsy();
  });
});
