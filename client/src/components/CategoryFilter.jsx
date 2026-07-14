import CustomDropdown from "./CustomDropdown";

const CategoryFilter = ({
    selectedCategory,
    setSelectedCategory,
}) => {
    const categories = [
        "All",
        "Food",
        "Transport",
        "Shopping",
        "Bills",
        "Entertainment",
        "Healthcare",
        "Education",
        "Other",
    ];

    return (
        <CustomDropdown
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories}
            placeholder="All Categories"
            className="w-full md:w-60"
        />
    );
};

export default CategoryFilter;