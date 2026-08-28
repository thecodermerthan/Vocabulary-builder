require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const { connectDB, closeDB } = require("../config/db");

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

describe("POST /register", () => {
  it("should create a new customer and return 201", async () => {
    const uniqueEmail = `test${Date.now()}@example.com`;

    const response = await request(app)
      .post("/register")
      .send({
        name: "Jest Test User",
        email: uniqueEmail,
        password: "testpass123"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.insertedId).toBeDefined();
  });

  it("should return 400 when registering with an already-used email", async () => {
    const email = `duplicate${Date.now()}@example.com`;

    await request(app).post("/register").send({
      name: "First User",
      email,
      password: "testpass123"
    });

    const response = await request(app).post("/register").send({
      name: "Second User",
      email,
      password: "testpass123"
    });

    expect(response.statusCode).toBe(400);
  });
});