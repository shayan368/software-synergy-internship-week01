
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password:{
            type: String,
            required:true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
        resetToken: {
            type: String,           
        },
        resetTokenExpiry: {
            type: Date,
        },
        isTwoFactorEnabled: {
            type: Boolean,
            default: false,
        },
        twoFactorOtp: {
            type: String,
        },
        twoFactorOtpExpiry: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

export default User;