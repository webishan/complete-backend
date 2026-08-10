import dotenv from "dotenv"

dotenv.config()


if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI in environment. Set it in .env before starting the server.")
}

if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment. Set it in .env before starting the server.")
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("Missing GOOGLE_CLIENT_ID in environment. Set it in .env before starting the server.")
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET in environment. Set it in .env before starting the server.")
}

if (!process.env.GOOGLE_REFRESH_TOKEN) {
    throw new Error("Missing GOOGLE_REFRESH_TOKEN in environment. Set it in .env before starting the server.")
}

if (!process.env.GOOGLE_USER) {
    throw new Error("Missing GOOGLE_USER in environment. Set it in .env before starting the server.")
}

const config = {
    MONGO_URI: process.env.MONGO_URI, 
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER: process.env.GOOGLE_USER
}


export default config