import request from "supertest";
import { app } from "./app";

vi.mock("./block", async () => {
  return await import("../__mocks__/block.mock");
});

vi.mock("./blockchain", async () => {
  return await import("../__mocks__/blockchain.mock");
});

describe("BlockChainServer Test", () => {
  it("GET /status", async () => {
    const response = await request(app).get("/status");

    expect(response.status).toEqual(200);
    expect(response.body.isValid._success).toBe(true);
  });
});
