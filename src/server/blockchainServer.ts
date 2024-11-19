import express from "express";
import morgan from "morgan";
import { app } from "./app";

const PORT: number = 3000;

app.use(morgan("tiny"));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Blockchain server is running at ${PORT}`);
});
