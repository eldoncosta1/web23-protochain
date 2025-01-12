import dotenv from "dotenv";
dotenv.config();

import { env } from "src/env";
import { app } from "./blockChainServer";

const PORT: number = parseInt(`${env.BLOCKCHAIN_PORT}`);

app.listen(PORT, () => {
  console.log(`Blockchain server is running at ${PORT}`);
});
