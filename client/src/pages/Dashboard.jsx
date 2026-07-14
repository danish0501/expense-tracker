import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import ExpenseForm from "../components/ExpenseForm";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ExpenseTable from "../components/ExpenseTable";
import { getExpenses } from "../services/expenseApi";
import EditExpenseModal from "../components/EditExpenseModal";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";
import CategoryPieChart from "../components/CategoryPieChart";

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [editingExpense, setEditingExpense] = useState(null);

    /* Fetch All Expenses */
    const fetchExpenses = async () => {
        try {
            setLoading(true);

            const response = await getExpenses();

            setExpenses(response.data.data.expenses);
        } catch (error) {
            console.error(error);

            toast.error("Failed to fetch expenses.");
        } finally {
            setLoading(false);
        }
    };

    /* Search + Category Filter */
    const filteredExpenses = expenses.filter((expense) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            expense.description.toLowerCase().includes(search) ||
            expense.category.toLowerCase().includes(search) ||
            expense.amount.toString().includes(search);

        const matchesCategory =
            selectedCategory === "All" ||
            expense.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    /* Initial Load */
    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div className="min-h-screen bg-[#f0f4fc] dark:bg-[#03050c] text-slate-800 dark:text-blue-100 transition-colors duration-500 relative">
            {/* Ambient Background Glows Wrapper */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 dark:bg-indigo-600/5 blur-[140px] rounded-full translate-x-1/2 translate-y-1/3" />
            </div>

            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">

                {/* Summary Cards */}
                <SummaryCard expenses={expenses} />

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                    <MonthlyExpenseChart
                        expenses={expenses}
                    />

                    <CategoryPieChart
                        expenses={expenses}
                    />

                </div>

                {/* Expense Form */}
                <div className="mt-8">
                    <ExpenseForm fetchExpenses={fetchExpenses} />
                </div>

                {/* Search & Category Filter */}
                <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>

                {/* Expense Table */}
                <div className="mt-8">
                    <ExpenseTable
                        expenses={filteredExpenses}
                        loading={loading}
                        fetchExpenses={fetchExpenses}
                        setEditingExpense={setEditingExpense}
                    />
                </div>

                {/* Edit Expense Modal */}
                <EditExpenseModal
                    editingExpense={editingExpense}
                    setEditingExpense={setEditingExpense}
                    fetchExpenses={fetchExpenses}
                />

            </main>
        </div>
    );
};

export default Dashboard;