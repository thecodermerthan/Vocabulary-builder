const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vocabulary Builder API",
      version: "1.0.0",
      description: "A PTE exam prep API for building personal vocabulary, tracking goals, and unlocking achievements."
    },
    servers: [
      { url: "http://localhost:3001" }
    ],
    tags: [
      { name: "Auth", description: "Registration, login, and customer accounts" },
      { name: "Dictionary", description: "Word lookup via external dictionary API" },
      { name: "Saved Words", description: "Manage your personal vocabulary list" },
      { name: "Goals", description: "Set and track your PTE study goal" },
      { name: "Achievements", description: "Milestones unlocked as you save words" },
      { name: "Quiz", description: "Practice with Answer Short Question and Multiple Choice quizzes" },
      { name: "Operations", description: "Server health checks" }
      { name: "Admin", description: "Admin-only endpoints for managing all users' data" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;