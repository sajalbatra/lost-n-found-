// import mongoose, { mongo } from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// create user and avatar is pending 
export const createUser = async (req, res) => {
  const { username, phonenumber, email, password, address, gender } = req.body;

  if (!username || !phonenumber || !email || !password || !address || !gender) {
    return res.json({ message: "All fields are required." });
  }

  const hashedpassword = bcrypt.hashSync(password, 10);

  try {
    const newuser = new User({
      username: username.toLowerCase(), // Corrected method name
      phonenumber,
      email,
      password: hashedpassword,
      address,
      gender,
    });

    await newuser.save();

    return res.json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Error while registering the user" });
  }
};

// change password is done
export const changePassword = async (req, res) => {
  const { username, password, newPassword } = req.body;

  if (!password || !newPassword) {
    return res.json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
      return res.json({ message: "Invalid password" });
    }

    const hashPassword = bcrypt.hashSync(newPassword, 10);

    user.password = hashPassword;
    await user.save();

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// login user is done 
export const loginUser = async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const user = await User.findOne({ Username });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const passwordValid = bcrypt.compareSync(Password, user.password);

    if (!passwordValid) {
      return res.json({ message: "Password is invalid" });
    }
  
    return res.json({ message: "Found user", USER: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while finding user" });
  }
};

export const updateAccountdetails = async (req, res) => {
  const { username, newusername, phonenumber, email, address, gender } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newusername) {
      user.username = newusername;
    }

    if (email) {
      user.email = email;
    }

    if (address) {
      user.address = address;
    }

    if (phonenumber) {
      user.phonenumber = phonenumber;
    }

    if (gender) {
      user.gender = gender;
    }

    await user.save();

    return res.json({ message: "Details changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
