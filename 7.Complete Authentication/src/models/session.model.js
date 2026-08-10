import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [ true, "User is required" ]  // User field is required
    },

    refreshTokenHash: {
        type: String,
        required: [ true, "Refresh token hash is required" ]  // Refresh token hash field is required
    },

    ip: {
        type: String,
        required: [ true, "IP address is required" ]  // IP address field is required
    },

    userAgent: {
        type: String,
        required: [ true, "User agent is required" ]  // User agent field is required
    },

    revoked: {
        type: Boolean,
        default: false  // Default value for revoked field is false
    }
},{
    timestamps: true  // Automatically add createdAt and updatedAt fields
})


const sessionModel = mongoose.model("sessions", sessionSchema)  // Create a Mongoose model for the sessions collection



export default sessionModel  // Export the session model for use in other parts of the application