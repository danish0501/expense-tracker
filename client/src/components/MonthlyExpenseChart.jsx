import { useContext, useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
} from "recharts";
import { ThemeContext } from "../context/ThemeContext";

const BAR_COLORS = [
    "#2563eb",
    "#3b82f6",
    "#60a5fa",
    "#818cf8",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f97316",
    "#f59e0b",
    "#22c55e",
    "#14b8a6",
];

const MonthlyExpenseChart = ({ expenses }) => {
    const { darkMode } = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 480);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const formatYAxis = (value) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(1).replace(/\.0$/, "")}Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(1).replace(/\.0$/, "")}L`;
        if (value >= 1000) return `₹${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
        return `₹${value}`;
    };

    const monthlyData = Array.from({ length: 12 }, (_, index) => ({
        month: new Date(0, index).toLocaleString("en", {
            month: "short",
        }),
        amount: 0,
    }));

    expenses.forEach((expense) => {
        const month = new Date(expense.date).getMonth();
        monthlyData[month].amount += Number(expense.amount);
    });

    const totalExpense = monthlyData.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    return (
        <div className="bg-white/60 dark:bg-[#090d16]/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/30 dark:border-blue-950/20 p-4 min-[375px]:p-6 transition-all duration-500">

            {/* Header */}
            <div className="flex flex-col min-[501px]:flex-row min-[501px]:justify-between min-[501px]:items-center gap-3 min-[501px]:gap-0 mb-6">

                <div>

                    <h2 className="text-xl min-[375px]:text-2xl font-bold text-slate-800 dark:text-blue-50">
                        Monthly Expenses
                    </h2>

                    <p className="text-xs min-[375px]:text-sm text-gray-500 dark:text-blue-300/60 mt-0.5">
                        Expense overview for the year
                    </p>

                </div>

                <div className="text-left min-[501px]:text-right">

                    <p className="text-gray-500 dark:text-blue-300/60 text-xs min-[375px]:text-sm">
                        Total
                    </p>

                    <h3 className="text-xl min-[375px]:text-2xl font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                        ₹{totalExpense.toLocaleString("en-IN")}
                    </h3>

                </div>

            </div>

            {/* Empty State */}
            {totalExpense === 0 ? (
                <div className="h-80 flex items-center justify-center">

                    <div className="text-center">

                        <div className="text-6xl mb-4">
                            📊
                        </div>

                        <h3 className="text-xl font-semibold text-slate-800 dark:text-blue-50">
                            No Expense Data
                        </h3>

                        <p className="text-gray-500 dark:text-blue-300/60 mt-2">
                            Add some expenses to view analytics.
                        </p>

                    </div>

                </div>
            ) : (
                <ResponsiveContainer width="100%" height={340}>

                    <BarChart
                        data={monthlyData}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -15,
                            bottom: 5,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={darkMode ? "#1e293b" : "#e2e8f0"}
                        />

                        <XAxis
                            dataKey="month"
                            tick={{
                                fill: darkMode ? "#94a3b8" : "#64748b",
                                fontSize: isMobile ? 10 : 11,
                            }}
                            tickFormatter={(value) => isMobile ? value.slice(0, 1) : value}
                            stroke={darkMode ? "#334155" : "#cbd5e1"}
                        />

                        <YAxis
                            tick={{
                                fill: darkMode ? "#94a3b8" : "#64748b",
                                fontSize: isMobile ? 9 : 10,
                            }}
                            tickFormatter={formatYAxis}
                            stroke={darkMode ? "#334155" : "#cbd5e1"}
                        />

                        <Tooltip
                            cursor={{
                                fill: darkMode ? "rgba(30, 41, 59, 0.3)" : "#f1f5f9",
                            }}
                            contentStyle={{
                                backgroundColor: darkMode ? "#0f172a" : "#ffffff",
                                borderColor: darkMode ? "#1e293b" : "#e2e8f0",
                                borderRadius: "12px",
                                color: darkMode ? "#f8fafc" : "#0f172a",
                            }}
                            formatter={(value) => [
                                `₹${Number(value).toLocaleString("en-IN")}`,
                                "Expense",
                            ]}
                        />

                        <Bar
                            dataKey="amount"
                            radius={[12, 12, 0, 0]}
                        >
                            {monthlyData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        BAR_COLORS[
                                        index % BAR_COLORS.length
                                        ]
                                    }
                                />
                            ))}
                        </Bar>

                    </BarChart>

                </ResponsiveContainer>
            )}

        </div>
    );
};

export default MonthlyExpenseChart;