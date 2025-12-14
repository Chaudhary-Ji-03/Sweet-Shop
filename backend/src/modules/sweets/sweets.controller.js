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

exports.searchSweets = async (req, res) => {
  const sweets = await sweetService.searchSweets(req.query);
  res.status(200).json(sweets);
};

exports.purchaseSweet = async (req, res) => {
  try {
    const sweet = await sweetService.purchaseSweet(req.params.id);
    res.status(200).json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.restockSweet = async (req, res) => {
  try {
    const sweet = await sweetService.restockSweet(req.params.id, req.body.quantity);
    res.status(200).json(sweet);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

