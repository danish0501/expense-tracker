import {
    FaWallet,
    FaReceipt,
    FaCalendarDay,
} from "react-icons/fa";
import { motion } from "framer-motion";

const SummaryCard = ({ expenses }) => {
    const totalAmount = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    const totalTransactions = expenses.length;

    const today = new Date().toISOString().split("T")[0];

    const todayExpense = expenses
        .filter(
            (expense) =>
                expense.date.split("T")[0] === today
        )
        .reduce(
            (sum, expense) =>
                sum + Number(expense.amount),
            0
        );

    const cards = [
        {
            title: "Total Expense",
            value: `₹${totalAmount.toLocaleString("en-IN")}`,
            icon: <FaWallet />,
            gradient: "from-blue-600 to-indigo-600",
        },
        {
            title: "Transactions",
            value: totalTransactions,
            icon: <FaReceipt />,
            gradient: "from-emerald-500 to-green-600",
        },
        {
            title: "Today's Expense",
            value: `₹${todayExpense.toLocaleString(
                "en-IN"
            )}`,
            icon: <FaCalendarDay />,
            gradient: "from-pink-500 to-red-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">

            {cards.map((card, index) => (

                <motion.div
                    key={index}
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.4,
                        delay: index * 0.15,
                    }}
                    whileHover={{
                        scale: 1.04,
                        y: -5,
                    }}
                    className={`bg-gradient-to-r ${card.gradient} rounded-[22px] sm:rounded-3xl shadow-xl p-4 sm:p-5 lg:p-6 text-white cursor-pointer border
                                border-white/10 transition-all duration-300`}
                >
                    <div className="flex justify-between items-center gap-2">

                        <div className="min-w-0">

                            <p className="text-white/80 text-xs sm:text-[11px] md:text-xs lg:text-sm tracking-wide truncate">

                                {card.title}

                            </p>

                            <h2 className="text-2xl sm:text-lg md:text-xl lg:text-3xl font-bold mt-2 sm:mt-1 md:mt-2 lg:mt-3 whitespace-nowrap truncate">

                                {card.value}

                            </h2>

                        </div>

                        <div className="text-3xl sm:text-2xl md:text-3xl lg:text-5xl opacity-80 shrink-0">

                            {card.icon}

                        </div>

                    </div>

                </motion.div>

            ))}

        </div>
    );
};

export default SummaryCard;