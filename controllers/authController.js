const authService = require("../services/authService");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const insertedId = await authService.registerCustomer({ name, email, password });
    res.status(201).json({ insertedId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getCustomers(req, res) {
  try {
    const customers = await authService.getAllCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, getCustomers };
