const mongoose = require('mongoose')
const userModel = require("../models/user.model")


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        await userModel.init()

        console.log("Database connected successfully")
    }

    catch(err) {
        console.error("Database connection failed", err)
    }
}


module.exports = connectDB