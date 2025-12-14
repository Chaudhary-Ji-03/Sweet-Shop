jest.mock("../config/db");
const prisma = require("../config/db");

const request = require("supertest");
const app = require("../app");




describe("Auth Middleware", () => {
  it("should block request without token", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(401);
  });

  it("should allow request with valid token", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ email: "mw@test.com", password: "123456" });

    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "mw@test.com", password: "123456" });

    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.statusCode).not.toBe(401);
  });
});
