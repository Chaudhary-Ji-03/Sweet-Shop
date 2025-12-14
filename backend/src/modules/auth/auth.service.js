const prisma = require("../../config/db");
const bcrypt = require("bcrypt");

exports.registerUser = async ({ email, password }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });
};

const jwt = require("jsonwebtoken");

exports.loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
  { userId: user.id, role: user.role }, 
  process.env.JWT_SECRET || "testsecret", 
  { expiresIn: "1h" }
);


  return token;
};
