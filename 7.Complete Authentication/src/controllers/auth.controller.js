import userModel from "../models/user.model.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import config from "../config/config.js"
import sessionModel from "../models/session.model.js"
import { sendEmail } from "../services/email.service.js"
import { generateOtp, getOtpHtml } from "../utils/utils.js"
import otpModel from "../models/otp.model.js"

export async function register(req,res) {
    const { username, email, password } = req.body

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isAlreadyRegistered) {
        res.status(409).json({ message: "User already exists" })  // 409 -> Conflict
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const otp = generateOtp()
    const html = getOtpHtml(otp)
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex")

    await otpModel.create({
        email,
        user: user._id,
        otpHash
    })

    await sendEmail(email, "OTP Verification", `Your OTP is: ${otp}`, html)


    res.status(201).json({
        message: "User registered successfully",
        user: {
            username: user.username,
            email: user.email,
            verified: user.verfied
        }
    })

}

export async function login(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"  // 401 -> Unauthorized
        })
    }

    if (!user.verfied) {
        return res.status(403).json({
            message: "User is not verified. Please verify your email."  // 403 -> Forbidden
        })
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordValid = hashedPassword === user.password

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid email or password"  // 401 -> Unauthorized
        })
    }

    const refreshToken = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET,
    {
        expiresIn: "7d"  // Refresh Token expires in 7 days
    })

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    })

    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    }, config.JWT_SECRET,
        {
            expiresIn: "15m"  // Access Token expires in 15 minutes
        })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,  // Cookie is not accessible via JavaScript
        secure: true,  // Cookie is only sent over HTTPS
        sameSite: "strict",  // Cookie is only sent for same-site requests
        maxAge: 7 * 24 * 60 * 60 * 1000  // Cookie expires in 7 days
    })

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            username: user.username,
            email: user.email
        },
        accessToken
    }
    )
}

export async function getMe(req, res) {
    const token = req.headers.authorization?.split(" ")[1]  // Extract the token from the Authorization header

    if (!token) {
        return res.status(401).json(
            { 
                message: "No token provided" 
            })  // 401 -> Unauthorized
    }

    const decoded = jwt.verify(token, config.JWT_SECRET)  // Verify the token using the JWT secret

    const user = await userModel.findById(decoded.id)  // Find the user by ID from the decoded token

    res.status(200).json({  // 200 -> OK
        message: "User fetched successfully",
        user: {
            username: user.username,
            email: user.email
        }
    })
}


export async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken  // Get the refresh token from the cookies

    if (!refreshToken) {
        res.status(401).json({ message: "No refresh token provided" })  // 401 -> Unauthorized
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET)  // Verify the refresh token using the JWT secret

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false  // Find the session with the matching refresh token hash and not revoked
    })

    if (!session) {
        return res.status(401).json({
            message: "Invalid refresh token"  // 401 -> Unauthorized
        })
    }

    const accessToken = jwt.sign({
        id: decoded.id
    }, config.JWT_SECRET, {
        expiresIn: "15m"  // Access Token expires in 15 minutes
    })

    const newRefreshToken = jwt.sign({
        id: decoded.id
    }, config.JWT_SECRET,
        {
            expiresIn: "7d"  // Refresh Token expires in 7 days
        }
    )

    const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex")

    session.refreshTokenHash = newRefreshTokenHash  // Update the session with the new refresh token hash
    await session.save()  // Save the updated session

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,  // Cookie is not accessible via JavaScript
        secure: true, // Cookie is only sent over HTTPS
        sameSite: "strict", // Cookie is only sent for same-site requests
        maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days
    })

    res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken
    })
}


export async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken  // Get the refresh token from the cookies

    if (!refreshToken) {
        return res.status(400).json({
            message: "No refresh token provided"  // 400 -> Bad Request
        })
    }


    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false  // Find the session with the matching refresh token hash and not revoked
    })

    if (!session) {
        return res.status(400).json({
            message: "Invalid refresh token"  // 400 -> Bad Request
        })
    }

    session.revoked = true  // Mark the session as revoked
    await session.save()  // Save the updated session

    res.clearCookie("refreshToken")  // Clear the refresh token cookie

    res.status(200).json({
        message: "Logged out successfully"  // 200 -> OK
    })
}


export async function logoutAll(req, res) {
    const refreshToken = req.cookies.refreshToken  // Get the refresh token from the cookies

    if (!refreshToken) {
        return res.status(400).json({
            message: "No refresh token provided"  // 400 -> Bad Request
        })
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET)  // Verify the refresh token using the JWT secret

    await sessionModel.updateMany({
        user: decoded.id,
        revoked: false  // Find all sessions for the user that are not revoked
    }, {
        revoked: true  // Mark all sessions as revoked
    })

    res.clearCookie("refreshToken")  // Clear the refresh token cookie

    res.status(200).json({
        message: "Logged out from all sessions successfully"  // 200 -> OK
    })
}

export async function verifyEmail(req, res) {
    const { otp, email } = req.body

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex")

    const otpDoc = await otpModel.findOne({
        email,
        otpHash
    })

    if (!otpDoc) {
        return res.status(400).json({
            message: "Invalid OTP"  // 400 -> Bad Request
        })
    }

    const user = await userModel.findByIdAndUpdate(otpDoc.user, {
        verfied: true  // Mark the user as verified
    })

    await otpModel.deleteMany({ 
        user: otpDoc.user,
     })  // Delete all OTPs for the email after successful verification

     return res.status(200).json({
        message: "Email verified successfully",  // 200 -> OK
        user: {
            username: user.username,
            email: user.email,
            verified: user.verfied
        }
     })
}