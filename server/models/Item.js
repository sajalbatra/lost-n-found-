import mongoose from "mongoose";
import User from '../models/User.js';

const itemSchema = new mongoose.Schema({
    itemimg: {
        type: String
    },
    itemname: {
        type: String,
        required: true
    },
    itemtags: {
        type: [String],
        validate: [
            function (val) {
                return val.length <= 5;
            },
            '{PATH} exceeds the limit of 5'
        ],
        required: true
    },
    estimated_cost: {
        type: Number,
        required: true
    },
    found_location: {
        type: String,
        required: true
    },
    returnto: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["lost", "found"],
        required: true
    },
    description: {
        type: String
    },
    contact_info: {
        type: String
    },
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);

export default Item;
