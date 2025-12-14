const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "testsecret");
    req.user = {
  userId: decoded.userId,
  role: decoded.role,
};
next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
