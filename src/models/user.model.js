import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  addressline_1: {
    type: String,
    required: true,
  },
  addressline_2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: [8, "Password must be of length 8"],
    },
    address: addressSchema,
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
