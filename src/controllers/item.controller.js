import mongoose from 'mongoose';
import ItemModel from "../models/item.model.js"; // Import the ItemModel
import User from '../models/user.model.js';
export const createitem = async (req, res) => {
    try {
        const { userid } = req.params;
        const {
            itemimg,
            itemtags,
            estimated_cost,
            found_location,
            itemname,
        } = req.body;
    
        if (!itemtags || !estimated_cost || !found_location || !itemname) {
            return res.status(400).json({ message: "All the fields are required " });
        }

        const newItem = await ItemModel.create({
            itemimg,
            itemname,
            itemtags,
            estimated_cost,
            found_location,
            user: userid 
        });

        // Return the newly created item as a response
        return res.status(201).json(newItem);
    } catch (error) {
        // Handle errors
        console.error("Error creating item:", error);
        return res.status(500).json({ error: "Could not create item" });
    }
};

export const returnto = async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await User.findById(userid); // Assuming UserModel is your user model

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { itemname, returnto } = req.body;

        // Find the item associated with the user
        const item = await ItemModel.findOneAndUpdate(
            { itemname, user: userid }, // Find the item by name and associated user
            { returnto: returnto }, // Update the returnto field of the item
            { new: true } // Return the updated document
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Update the returnto field of the user
        user.returnto = returnto;
        await user.save();

        return res.status(200).json({ message: "Return to action successful" });
    } catch (error) {
        // Handle errors
        console.error("Error in returnto:", error);
        return res.status(500).json({ error: "Could not perform returnto action" });
    }
};
