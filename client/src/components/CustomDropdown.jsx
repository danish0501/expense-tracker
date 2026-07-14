import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const CustomDropdown = ({ value, onChange, options, placeholder, icon, className = "", direction = "down" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (val) => {
        onChange(val);
        setIsOpen(false);
    };

    const selectedOption = options.find((opt) =>
        typeof opt === "string" ? opt === value : opt.value === value
    );

    const displayLabel = selectedOption
        ? (typeof selectedOption === "string" ? selectedOption : selectedOption.label)
        : placeholder;

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full rounded-xl border border-slate-200 dark:border-blue-950/20 bg-white/70 dark:bg-[#0f172a]/35 text-slate-800 dark:text-blue-100 pr-4 py-3 flex items-center justify-between outline-none transition-all focus:bg-white/90 dark:focus:bg-[#0f172a]/70 focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 focus:border-blue-500 cursor-pointer shadow-sm text-left ${icon ? "pl-12" : "pl-4"
                    }`}
            >
                <span className="flex items-center gap-2">
                    {icon && <span className="text-gray-400 absolute left-4">{icon}</span>}
                    <span className={value ? "" : "text-gray-400 dark:text-blue-200/40"}>
                        {displayLabel}
                    </span>
                </span>
                <FaChevronDown className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <ul className={`absolute left-0 right-0 max-h-60 overflow-y-auto rounded-xl border border-slate-200 dark:border-blue-950/30 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-xl shadow-2xl z-50 py-1 divide-y divide-slate-100/50 dark:divide-blue-950/10 ${direction === "up" ? "bottom-full mb-2" : "mt-2"
                    }`}>
                    {options.map((opt, index) => {
                        const val = typeof opt === "string" ? opt : opt.value;
                        const label = typeof opt === "string" ? opt : opt.label;
                        const isSelected = val === value;

                        return (
                            <li
                                key={index}
                                onClick={() => handleSelect(val)}
                                className={`px-4 py-2.5 text-sm cursor-pointer transition-all duration-200 flex items-center justify-between
                                    ${isSelected
                                        ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold"
                                        : "text-slate-700 dark:text-blue-100 hover:bg-slate-100/70 dark:hover:bg-[#0f172a]/80"
                                    }
                                `}
                            >
                                {label}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
