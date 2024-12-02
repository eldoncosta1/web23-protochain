import axios from "axios";
import { BlockInfo } from "../lib/blockinfo";
import { Block } from "src/lib/block";

const BLOCKCHAIN_SERVER = "http://localhost:3000";
const minerWallet = {
  privateKey: "",
  publicKey: "eldoncosta",
};

let totalMined = 0;

async function mine() {
  console.log("Getting next block info...");
  const { data: blockInfo } = await axios.get<BlockInfo>(
    `${BLOCKCHAIN_SERVER}/blocks/next`
  );

  const newBlock = Block.getBlockfromBlockInfo(blockInfo);

  //TODO: add reward transaction

  console.log(`Starting mining block #${newBlock.getIndex()}`);
  newBlock.mine(blockInfo.difficulty, minerWallet.publicKey);

  console.log("Block mined! Sending to blockchain...");

  try {
    await axios.post(`${BLOCKCHAIN_SERVER}/blocks`, newBlock);
    console.log("Block sent and accepted!");
    totalMined++;
    console.log(`Total mined blocks: ${totalMined}`);
  } catch (err: any) {
    console.error(err.response ? err.response.data : err.message);
  }

  setTimeout(() => {
    mine();
  }, 1000);
}

mine();
