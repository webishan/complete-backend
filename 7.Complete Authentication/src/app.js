import express from "express"
import morgan from "morgan"  // logger middleware for HTTP requests
import authRouter from "./routes/auth.routes.js"  // import the authRouter from the auth.routes.js file
import cookieParser from "cookie-parser"  // middleware to parse cookies from incoming requests


const app = express()


app.use(express.json())  // middleware to parse incoming JSON requests
app.use(morgan("dev"))  // use morgan middleware for logging HTTP requests
app.use(cookieParser())  // use cookie-parser middleware to parse cookies


app.use("/api/auth", authRouter)  // use the authRouter for routes starting with /api/auth

export default app