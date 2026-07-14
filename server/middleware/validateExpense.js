const { body, validationResult } = require("express-validator");
const { expenseCategories } = require("../constants/categories");

/* Expense Validation Rules */
const expenseValidationRules = [
    body("amount")
        .notEmpty()
        .withMessage("Amount is required.")
        .isNumeric()
        .withMessage("Amount must be a number.")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be greater than 0."),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required.")
        .isLength({ max: 100 })
        .withMessage("Description cannot exceed 100 characters."),

    body("category")
        .notEmpty()
        .withMessage("Category is required.")
        .isIn(expenseCategories)
        .withMessage("Invalid category."),

    body("date")
        .notEmpty()
        .withMessage("Date is required.")
        .isISO8601()
        .withMessage("Invalid date format."),
];

/* Validation Result Middleware */
const validateExpense = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: errors.array(),
        });
    }

    next();
};

module.exports = {
    expenseValidationRules,
    validateExpense,
};