require("dotenv").config();
const request = require("supertest");
const app = require("../app");

describe("GET /healthz", () => {
  it("should return status ok", async () => {
    const response = await request(app).get("/healthz");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });
});