import { useContext, useState, useEffect } from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../context/ThemeContext";

const COLORS = [
    "#2563eb",
    "#22c55e",
    "#f97316",
    "#ec4899",
    "#8b5cf6",
    "#14b8a6",
    "#ef4444",
    "#eab308",
];

const CategoryPieChart = ({ expenses }) => {
    const { darkMode } = useContext(ThemeContext);
    const [radius, setRadius] = useState({ outer: 110, inner: 55 });

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            if (w <= 375) {
                setRadius({ outer: 70, inner: 35 });
            } else if (w <= 425) {
                setRadius({ outer: 80, inner: 40 });
            } else if (w <= 768) {
                setRadius({ outer: 95, inner: 45 });
            } else {
                setRadius({ outer: 110, inner: 55 });
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /* Group Expenses Category Wise */

    const grouped = {};

    expenses.forEach((expense) => {
        grouped[expense.category] =
            (grouped[expense.category] || 0) +
            Number(expense.amount);
    });

    /* Convert Object to Array */
    const data = Object.entries(grouped).map(
        ([name, value]) => ({
            name,
            value,
        })
    );

    /* Total Expense */
    const totalExpense = data.reduce(
        (sum, item) => sum + item.value,
        0
    );

    return (
        <div className="bg-white/60 dark:bg-[#090d16]/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/30 dark:border-blue-950/20 p-4 min-[375px]:p-6 transition-all duration-500">

            <h2 className="text-xl font-bold mb-8 text-slate-800 dark:text-blue-50">
                Category Distribution
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                {/* Pie Chart */}
                <div className="w-full h-80">

                    <ResponsiveContainer width="100%" height="100%">

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={radius.outer}
                                innerRadius={radius.inner}
                                paddingAngle={3}
                                label={({ percent }) =>
                                    `${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[index % COLORS.length]
                                        }
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: darkMode ? "#0f172a" : "#ffffff",
                                    borderColor: darkMode ? "#1e293b" : "#e2e8f0",
                                    borderRadius: "12px",
                                    color: darkMode ? "#f8fafc" : "#0f172a",
                                }}
                                formatter={(value) => [
                                    `₹${Number(value).toLocaleString(
                                        "en-IN"
                                    )}`,
                                    "Amount",
                                ]}
                            />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                {/* Custom Legend */}
                <div className="space-y-4">

                    {data.map((item, index) => {

                        const percentage =
                            (
                                (item.value / totalExpense) *
                                100
                            ).toFixed(1);

                        return (

                            <div
                                key={index}
                                className="flex items-center justify-between p-3 min-[375px]:p-4 rounded-xl border border-white/30 dark:border-blue-950/15 bg-white/20 dark:bg-[#0f172a]/20 backdrop-blur-sm hover:shadow-md dark:hover:bg-[#0f172a]/55 transition duration-300 gap-2"
                            >

                                {/* Left */}
                                <div className="flex items-center gap-3 min-w-0">

                                    <span
                                        className="w-3 h-3 min-[375px]:w-4 min-[375px]:h-4 rounded-full shrink-0"
                                        style={{
                                            backgroundColor:
                                                COLORS[index % COLORS.length],
                                        }}
                                    />

                                    <span className="font-medium text-sm min-[375px]:text-base text-slate-700 dark:text-blue-100 truncate">

                                        {item.name}

                                    </span>

                                </div>

                                {/* Right */}
                                <div className="text-right shrink-0">

                                    <h4 className="font-semibold text-sm min-[375px]:text-base text-slate-800 dark:text-blue-50 whitespace-nowrap">

                                        ₹{item.value.toLocaleString("en-IN")}

                                    </h4>

                                    <p className="text-xs min-[375px]:text-sm text-gray-500 dark:text-blue-300/60">

                                        {percentage}%

                                    </p>

                                </div>

                            </div>

                        );
                    })}

                </div>

            </div>

        </div>
    );
};

export default CategoryPieChart;