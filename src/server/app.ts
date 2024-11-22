import express from "express";
import morgan from "morgan";
import { app } from "./blockChainServer";

const PORT: number = 3000;

app.listen(PORT, () => {
  console.log(`Blockchain server is running at ${PORT}`);
});
