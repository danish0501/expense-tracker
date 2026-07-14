import { useState } from "react";
import {
    FaPlusCircle,
    FaMoneyBillWave,
    FaFileAlt,
    FaTags,
    FaCalendarAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { createExpense } from "../services/expenseApi";
import CustomDropdown from "./CustomDropdown";

const ExpenseForm = ({ fetchExpenses }) => {
    const [formData, setFormData] = useState({
        amount: "",
        description: "",
        category: "",
        date: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createExpense(formData);

            toast.success("Expense added successfully!");

            await fetchExpenses();

            setFormData({
                amount: "",
                description: "",
                category: "",
                date: "",
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );
        }
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.5,
            }}
            className="bg-white/60 dark:bg-[#090d16]/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] 
                       dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/60 dark:border-blue-950/20 p-8 max-[425px]:p-4 transition-all duration-500"
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">

                <div
                    className="h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg"
                >
                    <FaPlusCircle className="text-white text-2xl" />
                </div>

                <div>

                    <h2 className="text-3xl max-[425px]:text-2xl font-bold text-slate-800 dark:text-blue-50">
                        Add New Expense
                    </h2>

                    <p className="text-gray-500 dark:text-blue-300/60">
                        Track your daily spending effortlessly
                    </p>

                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Amount */}
                <div className="relative">

                    <FaMoneyBillWave className="absolute left-4 top-4 text-gray-400" />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 dark:border-blue-950/25 bg-white/70 dark:bg-[#0f172a]/35
                                   text-slate-800 dark:text-blue-100 pl-12 pr-4 py-3 outline-none transition-all focus:bg-white/80
                                   dark:focus:bg-[#0f172a]/70 focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 focus:border-blue-500"
                    />

                </div>

                {/* Description */}
                <div className="relative">

                    <FaFileAlt className="absolute left-4 top-4 text-gray-400" />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 dark:border-blue-950/25 bg-white/70 dark:bg-[#0f172a]/35
                                   text-slate-800 dark:text-blue-100 pl-12 pr-4 py-3 outline-none transition-all focus:bg-white/80
                                   dark:focus:bg-[#0f172a]/70 focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 focus:border-blue-500"
                    />

                </div>

                {/* Category */}
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
                    direction="up"
                    className="w-full"
                />

                {/* Date */}
                <div className="relative">

                    <FaCalendarAlt className="absolute left-4 top-4 text-gray-400 cursor-pointer" />

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 dark:border-blue-950/25 bg-white/70 dark:bg-[#0f172a]/35 text-slate-800
                                   dark:text-blue-100 pl-12 pr-4 py-3 outline-none transition-all focus:bg-white/80 dark:focus:bg-[#0f172a]/70 focus:ring-2
                                   focus:ring-blue-500/40 dark:focus:ring-blue-600/40 focus:border-blue-500"
                    />

                </div>

                {/* Button */}
                <motion.button
                    whileHover={{
                        scale: 1.02,
                    }}
                    whileTap={{
                        scale: 0.97,
                    }}
                    type="submit"
                    className="md:col-span-2 py-3 rounded-xl text-white font-semibold shadow-lg bg-gradient-to-r from-blue-600
                               to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40"
                >
                    Add Expense
                </motion.button>

            </form>
        </motion.div>
    );
};

export default ExpenseForm;