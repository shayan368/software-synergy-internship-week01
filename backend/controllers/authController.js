import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from '../utils/sendEmail.js';


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email and password are required'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = crypto
            .randomBytes(32)
            .toString('hex');

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            isVerified: false
        });

        const verificationLink =
            `http://localhost:5173/verify/${verificationToken}`;

        await sendEmail(
            email,
            'Verify your account',
            `
        <h2>Welcome ${name}!</h2>

        <p>Thank you for registering.</p>

        <p>Please click the button below to verify your email:</p>

        <a href="${verificationLink}">
          Verify My Account
        </a>

        <p>If you did not create this account, you can ignore this email.</p>
      `
        );

        res.status(201).json({
            message: 'Registration successful. Please check your email to verify your account.'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
};


export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid verification token'
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({
            message: 'Email verified successfully'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check the required field
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required"
            });
        }

        //Find the user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }


        if (!user.isVerified) {
            return res.status(403).json({
                message: 'Please verify your email before logging in'
            });
        }

        //compare the password

        const isPassCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPassCorrect) {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }

        if (user.isTwoFactorEnabled) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            user.twoFactorOtp = await bcrypt.hash(otp, 10);
            user.twoFactorOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
            await user.save();

            await sendEmail(
                user.email,
                'Your 2-Step Verification Code',
                `<h2>Your Verification Code</h2>
                 <p>Here is your 6-digit code: <strong>${otp}</strong></p>
                 <p>It will expire in 10 minutes.</p>`
            );

            return res.status(200).json({
                message: "2FA required. Please verify your OTP.",
                requires2FA: true,
                email: user.email
            });
        }

        //Create the JWT

        const token = jwt.sign({
            userId: user.id
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );
        return res.status(200).json({
            message: "Login successfully",
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export const profile = async (req, res) => {

    try {

        const user = await User.findById(req.userId).select('-password');

        if (!user) {
            return res.status(404).json({
                message: "User not Found"
            })
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

export const logout = (req, res) => {

    res.status(200).json({
        message: "Logout Successful"
    })
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
        await user.save();

        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

        await sendEmail(
            user.email,
            'Password Reset Request',
            `<h2>Password Reset</h2>
             <p>You requested a password reset. Click the link below:</p>
             <a href="${resetLink}">Reset Password</a>
             <p>This link will expire in 1 hour.</p>`
        );

        res.status(200).json({ message: 'Password reset link sent to email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const verifyLogin2FA = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.twoFactorOtp || user.twoFactorOtpExpiry < Date.now()) {
            return res.status(400).json({ message: 'OTP expired or invalid' });
        }

        const isOtpValid = await bcrypt.compare(otp, user.twoFactorOtp);
        if (!isOtpValid) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        user.twoFactorOtp = undefined;
        user.twoFactorOtpExpiry = undefined;
        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: 'Login successfully',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const enable2FA = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isTwoFactorEnabled = !user.isTwoFactorEnabled;
        await user.save();

        res.status(200).json({ 
            message: `2-Step Verification ${user.isTwoFactorEnabled ? 'enabled' : 'disabled'} successfully`,
            isTwoFactorEnabled: user.isTwoFactorEnabled
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
