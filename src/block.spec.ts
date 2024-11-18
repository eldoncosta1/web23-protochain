import Block from "./block";

describe("Block Tests", () => {
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
    const valid = block.isValid(
      genesisBlock.getHash(),
      genesisBlock.getIndex()
    );
    expect(valid.success()).toBeTruthy();
  });

  it("should not be valid (fallbacks)", () => {
    const block = new Block();
    const valid = block.isValid(
      genesisBlock.getHash(),
      genesisBlock.getIndex()
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
      genesisBlock.getIndex()
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
      genesisBlock.getIndex()
    );
    expect(valid.success()).toBeFalsy();
  });

  it("should not be valid (hash)", () => {
    const block = new Block({
      index: 1,
      previousHash: genesisBlock.getHash(),
      data: "block 2",
    } as unknown as Block);
    block.setHash("");
    const valid = block.isValid(
      genesisBlock.getHash(),
      genesisBlock.getIndex()
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
      genesisBlock.getIndex()
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
      genesisBlock.getIndex()
    );
    expect(valid.success()).toBeFalsy();
  });
});
