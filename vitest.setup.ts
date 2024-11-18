import "reflect-metadata";

import { vi } from "vitest";

vi.mock("dotenv", () => ({
  config: vi.fn(),
}));

import "dotenv/config";

process.env.NODE_ENV = "test";
