const request = require("supertest");
const app = require("../../app");

const prisma = require("../../config/db"); 


jest.mock("../../config/db");


let adminToken;
let userToken;

beforeAll(async () => {
  // Admin user
  await request(app).post("/api/auth/register").send({
    email: "admin@test.com",
    password: "123456"
  });
  await prisma.user.update({
    where: { email: "admin@test.com" },
    data: { role: "ADMIN" }
  });

  const adminLogin = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "123456"
  });
  adminToken = adminLogin.body.token;

  // Normal user
  await request(app).post("/api/auth/register").send({
    email: "user@test.com",
    password: "123456"
  });
  const userLogin = await request(app).post("/api/auth/login").send({
    email: "user@test.com",
    password: "123456"
  });
  userToken = userLogin.body.token;
});

describe("Sweets Module", () => {
  it("should allow admin to create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 50,
        quantity: 100
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Chocolate Bar");
  });

  it("should block normal user from creating a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Lollipop",
        category: "Candy",
        price: 10,
        quantity: 50
      });

    expect(res.statusCode).toBe(403);
  });

  it("should list all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
