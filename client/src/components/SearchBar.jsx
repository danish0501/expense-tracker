const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <input
            type="text"
            placeholder="Search expense..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 border border-slate-200 dark:border-blue-950/20 rounded-xl px-4 py-3 bg-white/70 dark:bg-[#090d16]/50 backdrop-blur-md text-slate-800 dark:text-blue-100 outline-none transition-all focus:bg-white/90 dark:focus:bg-[#090d16]/80 focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 focus:border-blue-500 shadow-sm"
        />
    );
};

export default SearchBar;