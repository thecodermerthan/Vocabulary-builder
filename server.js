require("dotenv").config();
const { connectDB } = require("./config/db");
const { connectQueue } = require("./config/rabbitmq");
const app = require("./app");
const quizRoutes = require("./routes/quizRoutes");

async function startServer() {
  await connectDB();
  await connectQueue();

  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3001}`);
  });
}

app.use("/", quizRoutes);

startServer();