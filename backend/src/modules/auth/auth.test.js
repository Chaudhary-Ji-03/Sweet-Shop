const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/db");

jest.mock("../../config/db");

describe("Auth - Register", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      id: 1,
      email: "test@test.com",
    });

    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should not allow duplicate email registration", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "test@test.com",
    });

    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email already exists");
  });
});
