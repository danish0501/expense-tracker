const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log("=".repeat(50));
        console.log("MongoDB Connected Successfully");
        console.log(`Host : ${connection.connection.host}`);
        console.log("=".repeat(50));
    } catch (error) {
        console.error("MongoDB Connection Failed");
        // console.error(error.message);
        console.error(error);

        process.exit(1);
    }
};

module.exports = connectDB;