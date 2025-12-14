const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/db");
const bcrypt = require("bcrypt");

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

describe("Auth - Login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login user and return JWT token", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "login@test.com",
      password: await bcrypt.hash("123456", 10),
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "login@test.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should not login with wrong password", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "login@test.com",
      password: await bcrypt.hash("123456", 10),
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "login@test.com", password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
  });

  it("should not login with non-existing email", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nouser@test.com", password: "123456" });

    expect(res.statusCode).toBe(401);
  });
});
