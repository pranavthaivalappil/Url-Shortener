import mongoose from "mongoose";

const connectDb = async () => {
    try {
        // Check if already connected
        if (mongoose.connections[0].readyState) {
            console.log("Database already connected");
            return;
        }

        const connectionString = process.env.CONNECTION_STRING;
        if (!connectionString) {
            throw new Error("CONNECTION_STRING environment variable is not defined");
        }

        const connect = await mongoose.connect(connectionString);
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
        );
    } catch(error) {
        console.error("Database connection error:", error);
        throw error; // Don't exit process in serverless environment
    }
};

export default connectDb;