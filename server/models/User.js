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
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v); // Check if it's a 10-digit number
        },
        message: props => `${props.value} is not a valid 10-digit phone number!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
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
    phoneVerificationCode: {
      type: String,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
