const sweetService = require("./sweets.service");

exports.createSweet = async (req, res) => {
  try {
    const sweet = await sweetService.createSweet(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllSweets = async (req, res) => {
  const sweets = await sweetService.getAllSweets();
  res.status(200).json(sweets);
};
