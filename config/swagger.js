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
  apis: ["./routes/*.js"]   // tells Swagger to scan all files in the routes folder for comments
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;