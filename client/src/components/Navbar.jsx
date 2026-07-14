import { useContext } from "react";
import { motion } from "framer-motion";
import {
    FaWallet,
    FaMoon,
    FaSun,
} from "react-icons/fa";

import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
    const { darkMode, toggleTheme } =
        useContext(ThemeContext);

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <motion.header
            initial={{
                y: -60,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.5,
            }}
            className="sticky top-0 z-50 backdrop-blur-lg bg-white/60 dark:bg-[#090d16]/60 border-b border-white/30 dark:border-blue-950/25 shadow-md"
        >
            <div className="max-w-7xl mx-auto px-6 max-[425px]:px-4 py-3 flex justify-between items-center">

                {/* Left */}

                <div className="flex items-center gap-4 max-[425px]:gap-2">

                    <div
                        className="h-14 max-[425px]:h-12 w-14 max-[425px]:w-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg"
                    >
                        <FaWallet className="text-white text-2xl max-[425px]:text-xl" />
                    </div>

                    <div>

                        <h1 className="text-3xl max-[425px]:text-2xl font-bold text-slate-800 dark:text-blue-50">
                            Expense Tracker
                        </h1>

                        <p className="text-[11px] min-[360px]:text-xs sm:text-sm text-gray-500 dark:text-blue-300/60 mt-0.5 sm:mt-1">
                            Manage your daily expenses efficiently
                        </p>

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-5">

                    <div className="hidden md:block text-right">

                        <p className="text-sm text-gray-500 dark:text-blue-300/60">
                            Today
                        </p>

                        <h3 className="font-semibold text-slate-700 dark:text-blue-200">
                            {today}
                        </h3>

                    </div>

                    <motion.button
                        whileTap={{
                            rotate: 180,
                        }}
                        whileHover={{
                            scale: 1.1,
                        }}
                        onClick={toggleTheme}
                        className="h-12 w-12 rounded-full bg-slate-100 dark:bg-[#0f172a] hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white
                                   dark:text-blue-400 dark:hover:text-white transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer"
                    >
                        {darkMode ? (
                            <FaSun className="text-yellow-400 text-lg" />
                        ) : (
                            <FaMoon className="text-slate-700 text-lg" />
                        )}
                    </motion.button>

                </div>

            </div>
        </motion.header>
    );
};

export default Navbar;