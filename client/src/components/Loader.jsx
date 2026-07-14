import { ClipLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="flex justify-center items-center py-20">
            <ClipLoader
                color="#2563eb"
                size={55}
                speedMultiplier={1}
            />
        </div>
    );
};

export default Loader;