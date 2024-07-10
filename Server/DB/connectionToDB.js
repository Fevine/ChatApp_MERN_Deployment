import mongoose from "mongoose";

export async function connectionToDB() {
    try {
        await mongoose.connect(process.env.CON_URL)
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error.message);
    }
}
