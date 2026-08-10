import mongoose from "mongoose"
import config from "./config.js"


async function connectDB() {
    const uri = config.MONGO_URI

    if (typeof uri !== "string" || uri.trim() === "") {
        throw new Error("Missing MONGO_URI in environment. Set it in .env before starting the server.")
    }

    await mongoose.connect(uri)

    console.log("MongoDB connected")
}


export default connectDB