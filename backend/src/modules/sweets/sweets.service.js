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
