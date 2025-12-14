const prismaMock = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(), 
  },
  sweet: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

module.exports = prismaMock;
