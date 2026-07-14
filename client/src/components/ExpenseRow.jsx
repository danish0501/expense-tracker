import { FaTrash, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

const ExpenseRow = ({ expense, onDelete, onEdit }) => {
    const formattedDate = new Date(expense.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const getCategoryColor = (category) => {
        switch (category) {
            case "Food":
                return "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300";

            case "Transport":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";

            case "Shopping":
                return "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300";

            case "Bills":
                return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

            case "Healthcare":
                return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";

            case "Education":
                return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300";

            default:
                return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
        }
    };

    return (
        <motion.tr
            className="border-b border-white/10 dark:border-blue-950/15 hover:bg-blue-50/30 dark:hover:bg-blue-950/10 transition-all duration-300"
        >
            {/* Amount */}
            <td className="px-6 py-4 whitespace-nowrap">

                <span className="font-bold text-green-600 text-lg">

                    ₹{Number(expense.amount).toLocaleString("en-IN")}

                </span>

            </td>

            {/* Description */}
            <td className="px-6 py-4 text-slate-700 dark:text-blue-100 whitespace-nowrap max-w-[200px] truncate" title={expense.description}>

                {expense.description}

            </td>

            {/* Category */}
            <td className="px-6 py-4 whitespace-nowrap">

                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getCategoryColor(expense.category)}`}
                >
                    {expense.category}
                </span>

            </td>

            {/* Date */}
            <td className="px-6 py-4 text-slate-600 dark:text-blue-300/80 whitespace-nowrap">

                {formattedDate}

            </td>

            {/* Actions */}
            <td className="px-6 py-4 whitespace-nowrap">

                <div className="flex justify-center gap-3">

                    {/* Edit */}
                    <motion.button
                        whileHover={{
                            scale: 1.15,
                        }}
                        whileTap={{
                            scale: 0.9,
                        }}
                        onClick={() => onEdit(expense)}
                        className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400
                                   hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                        title="Edit Expense"
                    >
                        <FaEdit className="mx-auto" />
                    </motion.button>

                    {/* Delete */}
                    <motion.button
                        whileHover={{
                            scale: 1.15,
                        }}
                        whileTap={{
                            scale: 0.9,
                        }}
                        onClick={() => onDelete(expense._id)}
                        className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400
                                   hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                        title="Delete Expense"
                    >
                        <FaTrash className="mx-auto" />
                    </motion.button>

                </div>

            </td>
        </motion.tr>
    );
};

export default ExpenseRow;