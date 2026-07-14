import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateExpense } from "../services/expenseApi";
import CustomDropdown from "./CustomDropdown";
import { FaTags } from "react-icons/fa";

const EditExpenseModal = ({
    editingExpense,
    setEditingExpense,
    fetchExpenses,
}) => {
    const [formData, setFormData] = useState({
        amount: "",
        description: "",
        category: "",
        date: "",
    });

    /* Auto Fill Form */
    useEffect(() => {
        if (editingExpense) {
            setFormData({
                amount: editingExpense.amount,
                description: editingExpense.description,
                category: editingExpense.category,
                date: editingExpense.date.split("T")[0],
            });
        }
    }, [editingExpense]);

    /* Close Modal */
    const handleClose = () => {
        setEditingExpense(null);
    };

    /* Handle Input */
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    /* Handle Update */
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await updateExpense(editingExpense._id, formData);

            toast.success("Expense updated successfully!");

            await fetchExpenses();

            setEditingExpense(null);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update expense."
            );
        }
    };

    /* Modal Hidden */
    if (!editingExpense) return null;

    return (
        <div
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-[#090d16] border border-slate-200 dark:border-blue-950/20 rounded-2xl shadow-2xl w-[calc(100%-2rem)] md:w-full max-w-xl p-5 md:p-8 transition-all duration-300 overflow-visible"
            >

                <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-blue-50">
                    Edit Expense
                </h2>

                <form
                    onSubmit={handleUpdate}
                    className="grid grid-cols-1 gap-5 overflow-visible"
                >

                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        className="border border-slate-200 dark:border-blue-950/20 rounded-lg p-3 bg-white/70 dark:bg-[#0f172a]/35 text-slate-800 dark:text-blue-100 outline-none transition-all focus:bg-white/95 dark:focus:bg-[#0f172a]/70 focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 focus:border-blue-500"
                    />

                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="border border-slate-200 dark:border-blue-950/20 rounded-lg p-3 bg-white/70 dark:bg-[#0f172a]/35 text-slate-800 dark:text-blue-100 outline-none transition-all focus:bg-white/95 dark:focus:bg-[#0f172a]/70 focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 focus:border-blue-500"
                    />

                    <CustomDropdown
                        value={formData.category}
                        onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        options={[
                            "Food",
                            "Transport",
                            "Shopping",
                            "Bills",
                            "Entertainment",
                            "Healthcare",
                            "Education",
                            "Other"
                        ]}
                        placeholder="Select Category"
                        icon={<FaTags />}
                        className="w-full"
                    />

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border border-slate-200 dark:border-blue-950/20 rounded-lg p-3 bg-white/70 dark:bg-[#0f172a]/35 text-slate-800 dark:text-blue-100 outline-none transition-all focus:bg-white/95 dark:focus:bg-[#0f172a]/70 focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 focus:border-blue-500"
                    />

                    <div className="flex justify-end gap-4 mt-4">

                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-5 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold transition-all shadow-md"
                        >
                            Update Expense
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default EditExpenseModal;