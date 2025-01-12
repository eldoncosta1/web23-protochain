import express, { NextFunction, Request, Response } from "express";
import { Block } from "src/lib/block";
import { Blockchain } from "src/lib/blockchain";
import morgan from "morgan";

export const app = express();

app.use(morgan("tiny"));
app.use(express.json());

const blockchain = new Blockchain();

app.get("/status", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    numberOfBlocks: blockchain.getBlocks().length,
    isValid: blockchain.isValid(),
    lastBlock: blockchain.getLastBlock(),
  });
});

app.get("/blocks/next", (req: Request, res: Response, next: NextFunction) => {
  res.json(blockchain.getNextBlock());
});

app.get(
  "/blocks/:indexOrHash",
  (req: Request, res: Response, next: NextFunction) => {
    let block;
    if (/^[0-9]+$/.test(req.params.indexOrHash))
      block = blockchain.getBlocks()[parseInt(req.params.indexOrHash)];
    else block = blockchain.getBlockByHash(req.params.indexOrHash);
    if (!block) {
      res.status(404).json({ message: "Block not found" });
      return;
    }

    res.json(block);
  }
);

app.post("/blocks", (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  if (body.hash === undefined) {
    res.status(422).json({ success: false, message: "Invalid hash" });
    return;
  }

  const block = new Block(body as Block);
  const validation = blockchain.addBlock(block);

  if (validation.success()) {
    res.status(201).json(block);
    return;
  }

  res
    .status(400)
    .json({ success: validation.success(), message: validation.message() });
});
