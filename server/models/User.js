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
      min: [10, "Phone number 10 digit allowed"],
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    pfp: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1708819200&semt=ais",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
