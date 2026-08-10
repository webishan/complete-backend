import app from "./src/app.js"
import connectDB from "./src/config/database.js"

try {
    await connectDB() // connect to the database before starting server

    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
} catch (error) {
    console.error("Failed to start server:", error.message)
    process.exit(1)
}