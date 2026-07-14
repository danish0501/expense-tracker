const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const expenseRoutes = require("./routes/expenseRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.set("trust proxy", 1);

/* Security Middleware */
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

/* Global Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* Expense API Routes */
app.use("/api/expenses", expenseRoutes);

/* Health Check Route */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Expense Tracker API is running smoothly.",
  });
});

/* Not Found Middleware */
app.use(notFound);

/* Global Error Handler */
app.use(errorHandler);

module.exports = app;