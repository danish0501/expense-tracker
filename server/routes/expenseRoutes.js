const express = require("express");

const router = express.Router();

const { createExpense, getAllExpenses, updateExpense, deleteExpense } = require("../controllers/expenseController");

const { expenseValidationRules, validateExpense } = require("../middleware/validateExpense");

/* Expense Routes Base URL : /api/expenses */

// Get All Expenses
router.get("/", getAllExpenses);

// Create Expense
router.post(
    "/",
    expenseValidationRules,
    validateExpense,
    createExpense
);

// Update Expense
router.put(
    "/:id",
    expenseValidationRules,
    validateExpense,
    updateExpense
);

// Delete Expense
router.delete("/:id", deleteExpense);

module.exports = router;