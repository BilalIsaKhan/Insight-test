require("dotenv").config();

const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const { todosRoutes, authRoutes } = require("./routes");
const authenticate = require("./middleware/auth");

const { db } = require("./db");

(async function initApp() {
  try {
    const app = express();
    // Configure CORS options
    const corsOptions = {
      origin: "http://localhost:3000", // Adjust this to match the frontend URL
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };

    app.use(cors(corsOptions));
    const PORT = 3001;

    app.use(bodyParser.json());

    app.use("/auth", authRoutes);
    app.use("/todos", authenticate, todosRoutes);

    await db.batch(
      [
        `
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(255) PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          name VARCHAR(255) NOT NULL
        );
      `,
        `
        CREATE TABLE IF NOT EXISTS todos (
          id SERIAL PRIMARY KEY,
          text VARCHAR(255) NOT NULL,
          checked BOOLEAN,
          user_id VARCHAR(255) NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );
      `,
      ],
      "write"
    );
    console.log("Tables Created!");
    const rs = await db.execute("SELECT * FROM todos");
    console.log("Todos", rs);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log("Error", e);
  }
})();
