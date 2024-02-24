import mongoose from "mongoose";
//import User from "./user.model.js";

const itemSchema = new mongoose.Schema({
    itemimg: {
        type: String
    },
    itemname:{
        type: String,
        required: true
    },
    itemtags: {
        type: [String], 
        validate: [ 
            function(val) {
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
    }
}, { timestamps: true });

const ItemModel = mongoose.model("item", itemSchema);

export default ItemModel;
