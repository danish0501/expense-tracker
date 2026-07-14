const Expense = require("../models/Expense");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

/* Create New Expense POST /api/expenses */
const createExpense = asyncHandler(async (req, res) => {
  const { amount, description, category, date } = req.body;

  const expense = await Expense.create({
    amount,
    description,
    category,
    date,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      expense,
      "Expense added successfully."
    )
  );
});

/* Get All Expenses GET /api/expenses */
const getAllExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find().sort({
    createdAt: -1,
  });

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const response = {
    totalExpenses: expenses.length,
    totalAmount,
    expenses,
  };

  return res.status(200).json(
    new ApiResponse(
      200,
      response,
      "Expenses fetched successfully."
    )
  );
});

/* Update Expense PUT /api/expenses/:id */
const updateExpense = asyncHandler(async (req, res) => {
  const { amount, description, category, date } = req.body;

  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    throw new ApiError(404, "Expense not found.");
  }

  expense.amount = amount;
  expense.description = description;
  expense.category = category;
  expense.date = date;

  await expense.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      expense,
      "Expense updated successfully."
    )
  );
});

/* Delete Expense DELETE /api/expenses/:id */
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    throw new ApiError(404, "Expense not found.");
  }

  await expense.deleteOne();

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Expense deleted successfully."
    )
  );
});

module.exports = {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
};