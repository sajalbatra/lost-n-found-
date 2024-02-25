import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
class userController {
  static generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  };

  static sendPhoneVerificationCode = async (phoneNumber, code) => {
    try {
      const TWILIO_SID = "ACb41fa62bfdc9e939d3be3a9278016a46";
      const TWILIO_TOKEN = "a08442e6e578fa2d68a0e35203145ea8";
      const TWILIO_PNO = "+15755773336";

      const client = twilio(TWILIO_SID, TWILIO_TOKEN);
      await client.messages.create({
        from: TWILIO_PNO,
        body: `Your verification code is: ${code}`,
        to: `+91${phoneNumber}`,
      }).then(()=>{
        return res.json({
            status: true,
            message: "OTP sent",
          });
      })

      
    } catch (error) {
        await User.findOneAndDelete({phonenumber: phoneNumber})
      console.error("Error sending SMS:", error);
    }
  };

  static verifyOTP = (user, phoneOTP) => {
    return user.phoneVerificationCode === phoneOTP;
  };

  static register = async (req, res) => {
    try {
      const {
        username,
        phonenumber,
        password,
        password_confirmation,
        gender,
        address,
        pfp,
        message_otp,
      } = req.body;

      if (
        !username ||
        !phonenumber ||
        !password ||
        !password_confirmation ||
        !gender ||
        !address
      ) {
        return res.json({
          status: false,
          message: "All fields are required.",
        });
      }

      if (password !== password_confirmation) {
        return res.json({
          status: false,
          message: "Password and Confirmation Password didn't match.",
        });
      }

      const [userWithUsername, userWithPhoneNumber] = await Promise.all([
        User.findOne({ username }),
        User.findOne({ phonenumber }),
      ]);

      if (userWithUsername) {
        return res.json({
          status: false,
          message: "Username already taken.",
        });
      }

      if (userWithPhoneNumber) {
        return res.json({
          status: false,
          message:
            "Account with this phone number already exists. Try signing in.",
        });
      }

      const phoneVerificationCode = userController.generateOTP();

      const newUser = new User({
        username,
        password,
        createdAt: Date(),
        phonenumber,
        address,
        gender,
        pfp,
        phoneVerificationCode,
      });

      await userController.sendPhoneVerificationCode(
        newUser.phonenumber,
        phoneVerificationCode
      );

      const tempUser = await newUser.save();

      res.json({ user: tempUser });
    } catch (error) {
      res.json({
        status: false,
        message: error.message,
      });
    }
  };

  static verify_register = async (req, res) => {
    try {
      const { message_otp, tempUser } = req.body;
      if (!message_otp) {
        res.json({
          status: false,
          message: "OTP empty or invalid",
        });
        const user = await User.findOne({ _id: tempUser._id });
        if (!user) {
          res.json({
            status: failed,
            message: "Verification failed, try again later!",
          });
        }
        if (user.phoneVerificationCode != message_otp) {
          await User.findByIdAndDelete(tempUser._id);

          res.json({
            status: false,
            message: "OTP verification failed",
          });
        }
        const savedUser = await user.save();
      }
    } catch (error) {
      res.json({
        status: false,
        message: error.message,
      });
    }
  };

  static login = async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.json({
          status: false,
          message: "Invalid username or password.",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.json({
          status: false,
          message: "Invalid username or password.",
        });
      }

      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      return res.json({
        status: true,
        message: "Login successful.",
        token: token,
      });
    } catch (error) {
      res.json({
        status: false,
        message: error.message,
      });
    }
  };

  static updateDetail = async (req, res) => {
    try {
      const { username, phonenumber, address, gender } = req.body;

      const userId = req.user.userID;

      const user = await User.findById(userId);

      if (!user) {
        return res.json({
          status: false,
          message: "User not found.",
        });
      }

      user.username = username || user.username;
      user.phonenumber = phonenumber || user.phonenumber;
      user.address = address || user.address;
      user.gender = gender || user.gender;

      await user.save();

      return res.json({
        status: true,
        message: "User details updated successfully.",
      });
    } catch (error) {
      res.json({
        status: false,
        message: error.message,
      });
    }
  };

  static getUser = async (req, res) => {
    try {
      const userId = req.user._id;

      const user = await User.findById(userId);

      if (!user) {
        return res.json({
          status: false,
          message: "User not found.",
        });
      }

      const sanitizedUser = {
        username: user.username,
        phonenumber: user.phonenumber,
        address: user.address,
        gender: user.gender,
        createdAt: user.createdAt,
        pfp: user.pfp,
        updatedAt: user.updatedAt,
      };

      return res.json({
        status: true,
        user: sanitizedUser,
      });
    } catch (error) {
      res.json({
        status: false,
        message: error.message,
      });
    }
  };

  static changePassword = async (req, res) => {
    try {
      const userId = req.user._id;
      const { currentPassword, newPassword, confirmPassword } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.json({
          status: false,
          message: "User not found.",
        });
      }

      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!passwordMatch) {
        return res.json({
          status: false,
          message: "Current password is incorrect.",
        });
      }

      if (newPassword !== confirmPassword) {
        return res.json({
          status: false,
          message: "New password and confirmation password didn't match.",
        });
      }

      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = newHashedPassword;
      await user.save();

      return res.json({
        status: true,
        message: "Password changed successfully.",
      });
    } catch (error) {
      res.json({
        status: false,
        message: error.message,
      });
    }
  };

  static updateDetail = async (req, res) => {
    try {
      const { username, phonenumber, address, gender, message_otp } = req.body;

      const userId = req.user.userID;

      const user = await User.findById(userId);

      if (!user) {
        return res.json({
          status: false,
          message: "User not found.",
        });
      }

      // Check if entered OTP is correct
      if (!userController.verifyOTP(user, message_otp)) {
        return res.json({
          status: false,
          message: "Incorrect OTP",
        });
      }

      user.username = username || user.username;
      user.phonenumber = phonenumber || user.phonenumber;
      user.address = address || user.address;
      user.gender = gender || user.gender;

      await user.save();

      return res.json({
        status: true,
        message: "User details updated successfully.",
      });
    } catch (error) {
      res.json({
        status: false,
        message: error.message,
      });
    }
  };
}

export default userController;
