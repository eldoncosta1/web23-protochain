import request from "supertest";

vi.mock("../lib/block", async () => {
  return await import("../lib/__mocks__/block.mock");
});

vi.mock("../lib/blockchain", async () => {
  return await import("../lib/__mocks__/blockchain.mock");
});

import { app } from "./blockChainServer";
import { Block } from "src/lib/block";

describe("BlockChainServer Test", () => {
  it("GET /status - should return status", async () => {
    const response = await request(app).get("/status");

    expect(response.status).toEqual(200);
    expect(response.body.isValid._success).toBe(true);
  });

  it("GET /status/:index - should get genesis", async () => {
    const response = await request(app).get("/blocks/0");

    expect(response.status).toEqual(200);
    expect(response.body.index).toEqual(0);
  });

  it("GET /status/next - should get next block info", async () => {
    const response = await request(app).get("/blocks/next");

    expect(response.status).toEqual(200);
    expect(response.body.index).toEqual(1);
  });

  it("GET /blocks/:hash - should get block", async () => {
    const response = await request(app).get("/blocks/abc");

    expect(response.status).toEqual(200);
    expect(response.body.hash).toEqual("abc");
  });

  it("GET /blocks/:index - should NOT get block", async () => {
    const response = await request(app).get("/blocks/-1");

    expect(response.status).toEqual(404);
  });

  it("POST /blocks - should add block", async () => {
    const block = new Block({
      index: 1,
    } as unknown as Block);
    const response = await request(app).post("/blocks/").send(block);

    expect(response.status).toEqual(201);
    expect(response.body.index).toEqual(1);
  });

  it("POST /blocks - should NOT add block (empty)", async () => {
    const response = await request(app).post("/blocks/").send({});

    expect(response.status).toEqual(422);
  });

  it("POST /blocks - should NOT add block (invalid)", async () => {
    const block = new Block({
      index: -1,
    } as unknown as Block);
    const response = await request(app).post("/blocks/").send(block);

    expect(response.status).toEqual(400);
  });
});
