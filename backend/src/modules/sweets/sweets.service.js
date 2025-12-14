const prisma = require("../../config/db");

exports.createSweet = async ({ name, category, price, quantity }) => {
  return await prisma.sweet.create({
    data: { name, category, price, quantity }
  });
};

exports.getAllSweets = async () => {
  return await prisma.sweet.findMany();
};

exports.searchSweets = async ({ name, category, minPrice, maxPrice }) => {
  return await prisma.sweet.findMany({
    where: {
      AND: [
        name ? { name: { contains: name, mode: "insensitive" } } : {},
        category ? { category: { equals: category, mode: "insensitive" } } : {},
        minPrice ? { price: { gte: Number(minPrice) } } : {},
        maxPrice ? { price: { lte: Number(maxPrice) } } : {}
      ]
    }
  });
};

exports.purchaseSweet = async (id) => {
  const sweet = await prisma.sweet.findUnique({ where: { id: Number(id) } });
  if (!sweet) throw new Error("Sweet not found");
  if (sweet.quantity <= 0) throw new Error("Out of stock");

  return await prisma.sweet.update({
    where: { id: Number(id) },
    data: { quantity: sweet.quantity - 1 }
  });
};

exports.restockSweet = async (id, qty) => {
  if (qty <= 0) throw new Error("Quantity must be positive");
  const sweet = await prisma.sweet.findUnique({ where: { id: Number(id) } });
  if (!sweet) throw new Error("Sweet not found");

  return await prisma.sweet.update({
    where: { id: Number(id) },
    data: { quantity: sweet.quantity + qty }
  });
};
