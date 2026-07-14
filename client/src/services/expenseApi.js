import axios from "axios";

const expenseApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/* Expense APIs */

export const getExpenses = () => expenseApi.get("/expenses");

export const createExpense = (expenseData) =>
    expenseApi.post("/expenses", expenseData);

export const updateExpense = (id, expenseData) =>
    expenseApi.put(`/expenses/${id}`, expenseData);

export const deleteExpense = (id) =>
    expenseApi.delete(`/expenses/${id}`);

console.log("API URL:", import.meta.env.VITE_API_URL);

export default expenseApi;