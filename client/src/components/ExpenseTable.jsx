import { motion } from "framer-motion";
import { FaReceipt } from "react-icons/fa";
import toast from "react-hot-toast";
import { deleteExpense } from "../services/expenseApi";
import ExpenseRow from "./ExpenseRow";
import Loader from "./Loader";

const ExpenseTable = ({
    expenses,
    loading,
    fetchExpenses,
    setEditingExpense,
}) => {
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) return;

        try {
            await deleteExpense(id);

            toast.success("Expense deleted successfully!");

            await fetchExpenses();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to delete expense."
            );
        }
    };

    /* Loading */
    if (loading) {
        return (
            <div
                className="bg-white/60 dark:bg-[#090d16]/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.06)]
                 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/30 dark:border-blue-950/20 p-8 transition-all duration-500"
            >
                <div className="flex items-center gap-3 mb-6">

                    <FaReceipt className="text-blue-600 text-3xl" />

                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                        Recent Expenses
                    </h2>

                </div>

                <Loader />
            </div>
        );
    }

    /* Empty State */
    if (expenses.length === 0) {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="bg-white/60 dark:bg-[#090d16]/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                           border border-white/30 dark:border-blue-950/20 p-12 transition-all duration-500"
            >
                <div className="text-center">

                    <div className="text-7xl">
                        📭
                    </div>

                    <h2 className="text-2xl font-bold mt-4 text-slate-800 dark:text-white">
                        No Expenses Found
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Start by adding your first expense.
                    </p>

                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 30,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.5,
            }}
            className="bg-white/60 dark:bg-[#090d16]/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                       border border-white/30 dark:border-blue-950/20 overflow-hidden transition-all duration-500"
        >
            {/* Header */}
            <div
                className="px-8 py-6 flex justify-between items-center border-b border-white/20 dark:border-blue-950/20"
            >
                <div className="flex items-center gap-3">

                    <FaReceipt className="text-blue-600 text-3xl" />

                    <div>

                        <h2 className="text-2xl font-bold text-slate-800 dark:text-blue-50">
                            Recent Expenses
                        </h2>

                        <p className="text-gray-500 dark:text-blue-300/60 text-sm">
                            Total Records : {expenses.length}
                        </p>

                    </div>

                </div>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        >

                            <th className="px-6 py-4 text-left whitespace-nowrap">
                                Amount
                            </th>

                            <th className="px-6 py-4 text-left whitespace-nowrap">
                                Description
                            </th>

                            <th className="px-6 py-4 text-left whitespace-nowrap">
                                Category
                            </th>

                            <th className="px-6 py-4 text-left whitespace-nowrap">
                                Date
                            </th>

                            <th className="px-6 py-4 text-center whitespace-nowrap">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody
                        className="divide-y divide-slate-200/50 dark:divide-blue-950/15 bg-transparent"
                    >
                        {expenses.map((expense) => (
                            <ExpenseRow
                                key={expense._id}
                                expense={expense}
                                onDelete={handleDelete}
                                onEdit={setEditingExpense}
                            />
                        ))}
                    </tbody>

                </table>

            </div>
        </motion.div>
    );
};

export default ExpenseTable;