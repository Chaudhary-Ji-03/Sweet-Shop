const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/db");

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

describe("Sweets Search", () => {
  it("should search sweets by name", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=Chocolate")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should search sweets by price range", async () => {
    const res = await request(app)
      .get("/api/sweets/search?minPrice=10&maxPrice=60")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("Inventory Module", () => {
  let sweetId;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Candy Cane",
        category: "Candy",
        price: 20,
        quantity: 10
      });
    sweetId = res.body.id;
  });

  it("should allow user to purchase a sweet and decrease quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(9);
  });

  it("should not allow purchase if quantity is zero", async () => {
    await prisma.sweet.update({ where: { id: sweetId }, data: { quantity: 0 } });
    
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(400);
  });

  it("should allow admin to restock a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(5);
  });

  it("should block non-admin from restocking", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(403);
  });
});
