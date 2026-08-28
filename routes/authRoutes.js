const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new customer account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Email already registered
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in and receive a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a JWT token
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 *       401:
 *         description: No token provided
 */
router.get("/customers", authenticateToken, authController.getCustomers);

module.exports = router;