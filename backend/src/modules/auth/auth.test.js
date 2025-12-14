const request = require("supertest");
const app = require("../../app");

describe("Auth - Register", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "user1@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should not allow duplicate email registration", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        email: "user2@test.com",
        password: "123456"
      });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "user2@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
  });
});
