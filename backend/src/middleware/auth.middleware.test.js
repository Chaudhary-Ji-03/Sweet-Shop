jest.mock("../config/db"); // Prisma ko mock karo
const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const request = require("supertest");
const app = require("../app");

// Setup mocks for register/login flow
beforeAll(async () => {
  // Mock for register
  prisma.user.findUnique.mockImplementation(async ({ where }) => {
    if (where.email === "mw@test.com") {
      return { 
        id: 1, 
        email: "mw@test.com", 
        password: await bcrypt.hash("123456", 10), 
        role: "user" 
      };
    }
    return null;
  });

  prisma.user.create.mockResolvedValue({
    id: 1,
    email: "mw@test.com",
  });
});

describe("Auth Middleware", () => {
  it("should block request without token", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(401); // Unauthorized
  });

  it("should allow request with valid token", async () => {
    // Register user (mocked)
    await request(app)
      .post("/api/auth/register")
      .send({ email: "mw@test.com", password: "123456" });

    // Login user to get token
    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "mw@test.com", password: "123456" });

    console.log("Generated token:", login.body.token); // Debug

    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.statusCode).toBe(200); // Should succeed
  });
});

it("should block non-admin user", async () => {
  const login = await request(app)
    .post("/api/auth/login")
    .send({ email: "mw@test.com", password: "123456" });

  const res = await request(app)
    .delete("/api/sweets/1")
    .set("Authorization", `Bearer ${login.body.token}`);

  expect(res.statusCode).toBe(403);
});
