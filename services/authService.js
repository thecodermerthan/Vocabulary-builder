const bcrypt = require("bcrypt");
const customerRepository = require("../repositories/customerRepository");

async function registerCustomer({ name, email, password }) {
  const existing = await customerRepository.findByEmail(email);
  if (existing) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await customerRepository.insertCustomer({
    name,
    email,
    password: hashedPassword,
    role: "customer"
  });

  return result.insertedId;
}

async function getAllCustomers() {
  const customers = await customerRepository.findAll();
  return customers.map(({ password, ...rest }) => rest);
}

module.exports = { registerCustomer, getAllCustomers };