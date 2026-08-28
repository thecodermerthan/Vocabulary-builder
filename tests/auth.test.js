require("dotenv").config();
const request = require("supertest");
const app = require("../app");

describe("GET /customers", () => {
  it("should return 401 when no token is provided", async () => {
    const response = await request(app).get("/customers");

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("No token provided");
  });

  it("should return 403 when an invalid token is provided", async () => {
    const response = await request(app)
      .get("/customers")
      .set("Authorization", "Bearer invalid.token.here");

    expect(response.statusCode).toBe(403);
  });
});