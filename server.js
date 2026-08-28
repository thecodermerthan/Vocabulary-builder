require("dotenv").config();
const { connectDB } = require("./config/db");
const app = require("./app");

async function startServer() {
  await connectDB();
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3001}`);
  });
}

startServer();