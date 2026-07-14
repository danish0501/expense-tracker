const mongoose = require("mongoose");
const { expenseCategories } = require("../constants/categories");

const expenseSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [1, "Amount must be greater than 0"],
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: [100, "Description cannot exceed 100 characters"],
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            enum: expenseCategories,
        },

        date: {
            type: Date,
            required: [true, "Date is required"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Expense", expenseSchema);