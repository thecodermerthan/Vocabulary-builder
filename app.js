const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/authRoutes");
const dictionaryRoutes = require("./routes/dictionaryRoutes");
const savedWordsRoutes = require("./routes/savedWordsRoutes");
const goalsRoutes = require("./routes/goalsRoutes");
const achievementsRoutes = require("./routes/achievementsRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/healthz", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.use("/", authRoutes);
app.use("/", dictionaryRoutes);
app.use("/", savedWordsRoutes);
app.use("/", goalsRoutes);
app.use("/", achievementsRoutes);

module.exports = app;