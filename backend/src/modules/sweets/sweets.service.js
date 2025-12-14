const prisma = require("../../config/db");

exports.createSweet = async ({ name, category, price, quantity }) => {
  return await prisma.sweet.create({
    data: { name, category, price, quantity }
  });
};

exports.getAllSweets = async () => {
  return await prisma.sweet.findMany();
};
