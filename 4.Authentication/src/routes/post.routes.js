const express = require('express')
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")


const router = express.Router()


router.post("/create", async (req, res) => {
    // Check if the user is authenticated by verifying the JWT token from cookies
    const token = req.cookies.token

    if (!token) {
       return res.status(401).json({
            message: "Unauthorized"
        })
    }

    let decoded

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err) {
        return res.status(401).json({
            message: "Token is invalid or expired"
        })
    }

    const user = await userModel.findOne({
        _id: decoded.id
    })

    if (!user) {
        return res.status(401).json({
            message: "User not found"
        })
    }

    console.log(user)
    
    res.send("Post created successfully")

})


module.exports = router