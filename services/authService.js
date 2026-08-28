const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const customerRepository = require("../repositories/customerRepository");

async function loginCustomer({ email, password }) {
  const customer = await customerRepository.findByEmail(email);
  if (!customer) {
    throw new Error("Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(password, customer.password);
  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { customerId: customer._id, name: customer.name, role: customer.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
}

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

module.exports = { registerCustomer, getAllCustomers, loginCustomer };