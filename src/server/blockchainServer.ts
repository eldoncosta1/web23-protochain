import express from "express";
import { Block } from "src/block";
import { Blockchain } from "src/blockchain";
import morgan from "morgan";

export const app = express();

app.use(morgan("tiny"));
app.use(express.json());

const blockchain = new Blockchain();

app.get("/status", (req, res, next) => {
  res.json({
    numberOfBlocks: blockchain.getBlocks().length,
    isValid: blockchain.isValid(),
    lastBlock: blockchain.getLastBlock(),
  });
});

app.get("/blocks/:indexOrHash", (req, res) => {
  let block;
  if (/^[0-9]+$/.test(req.params.indexOrHash))
    block = blockchain.getBlocks()[parseInt(req.params.indexOrHash)];
  else block = blockchain.getBlockByHash(req.params.indexOrHash);
  if (!block) res.status(404).json({ message: "Block not found" });

  res.json(block);
});

app.post("/blocks", (req, res, next) => {
  const body = req.body;

  if (body.hash === undefined)
    res.status(422).json({ success: false, message: "Invalid hash" });

  const block = new Block(body as Block);
  const validation = blockchain.addBlock(block);

  if (validation.success()) res.status(201).json(block);

  res
    .status(400)
    .json({ success: validation.success(), message: validation.message() });
});
