import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class userController {
    static register = async (req, res) => {
        try {
            const { username, phonenumber, password, password_confirmation, email, gender, address, pfp } = req.body;

            if (!username || !phonenumber || !password || !password_confirmation || !email || !gender || !address) {
                return res.json({
                    "status": false,
                    "message": "All fields are required."
                });
            }

            if (password !== password_confirmation) {
                return res.json({
                    "status": false,
                    "message": "Password and Confirmation Password didn't match."
                });
            }

            const [userWithUsername, userWithEmail, userWithPhoneNumber] = await Promise.all([
                User.findOne({ username }),
                User.findOne({ email }),
                User.findOne({ phonenumber }),
            ]);

            if (userWithUsername) {
                return res.json({
                    "status": false,
                    "message": "Username already taken."
                });
            }

            if (userWithEmail) {
                return res.json({
                    "status": false,
                    "message": "Account with this email already exists. Try signing in."
                });
            }

            if (userWithPhoneNumber) {
                return res.json({
                    "status": false,
                    "message": "Account with this phone number already exists. Try signing in."
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(password, salt);

            const newUser = new User({
                username,
                email,
                password: hashed_password,
                createdAt: Date(),
                phonenumber,
                address,
                gender,
                pfp
            });

            const savedUser = await newUser.save();

            const token = jwt.sign({ userID: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            return res.json({
                "status": true,
                "message": "User created successfully.",
                "token": token
            });
        } catch (error) {
            res.json({
                "status": false,
                "message": error.message
            });
        }
    }
    static login = async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });

            if (!user) {
                return res.json({
                    "status": false,
                    "message": "Invalid username or password."
                });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.json({
                    "status": false,
                    "message": "Invalid username or password."
                });
            }

            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            return res.json({
                "status": true,
                "message": "Login successful.",
                "token": token
            });
        } catch (error) {
            res.json({
                "status": false,
                "message": error.message
            });
        }
    }

    static updateDetail = async (req, res) => {
        try {
            const { username, email, phonenumber, address, gender } = req.body;

             const userId = req.user.userID;

            const user = await User.findById(userId);

            if (!user) {
                return res.json({
                    "status": false,
                    "message": "User not found."
                });
            }

            user.username = username || user.username;
            user.email = email || user.email;
            user.phonenumber = phonenumber || user.phonenumber;
            user.address = address || user.address;
            user.gender = gender || user.gender;

            await user.save();

            return res.json({
                "status": true,
                "message": "User details updated successfully."
            });
        } catch (error) {
            res.json({
                "status": false,
                "message": error.message
            });
        }
    }

    static getUser = async (req, res) => {
        try {
            const userId = req.user._id;

            const user = await User.findById(userId);

            if (!user) {
                return res.json({
                    "status": false,
                    "message": "User not found."
                });
            }

            const sanitizedUser = {
                username: user.username,
                email: user.email,
                phonenumber: user.phonenumber,
                address: user.address,
                gender: user.gender,
                createdAt: user.createdAt,
                pfp: user.pfp,
                updatedAt: user.updatedAt
            };

            return res.json({
                "status": true,
                "user": sanitizedUser
            });
        } catch (error) {
            res.json({
                "status": false,
                "message": error.message
            });
        }
    }

    static changePassword = async (req, res) => {
        try {
            const userId = req.user._id;
            const { currentPassword, newPassword, confirmPassword } = req.body;

            const user = await User.findById(userId);

            if (!user) {
                return res.json({
                    "status": false,
                    "message": "User not found."
                });
            }

            const passwordMatch = await bcrypt.compare(currentPassword, user.password);

            if (!passwordMatch) {
                return res.json({
                    "status": false,
                    "message": "Current password is incorrect."
                });
            }

            if (newPassword !== confirmPassword) {
                return res.json({
                    "status": false,
                    "message": "New password and confirmation password didn't match."
                });
            }

            const newHashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = newHashedPassword;
            await user.save();

            return res.json({
                "status": true,
                "message": "Password changed successfully."
            });
        } catch (error) {
            res.json({
                "status": false,
                "message": error.message
            });
        }
    }
}

export default userController;
