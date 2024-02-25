import Item from '../models/Item.js';

class itemController {
    static createItem = async (req, res) => {
        try {
            const { itemimg, itemname, itemtags, estimated_cost, found_location, returnto, status, description, contact_info } = req.body;

            const newItem = new Item({
                itemimg,
                itemname,
                itemtags,
                estimated_cost,
                found_location,
                returnto,
                user: req.user.userID, 
                status,
                description,
                contact_info
            });

            const savedItem = await newItem.save();

            return res.json({
                "status": true,
                "message": "Item created successfully.",
                "item": savedItem
            });
        } catch (error) {
            res.json({
                "status": false,
                "message": error.message
            });
        }
    }

    static getAllItems = async (req, res) => {
        try {
            const items = await Item.find();

            return res.json({
                "status": true,
                "items": items
            });
        } catch (error) {
            res.json({
                "status": false,
                "message": error.message
            });
        }
    }

    static getItemById = async (req, res) => {
        try {
            const itemId = req.params.itemId;

            const item = await Item.findById(itemId);

            if (!item) {
                return res.json({
                    "status": false,
                    "message": "Item not found."
                });
            }

            return res.json({
                "status": true,
                "item": item
            });
        } catch (error) {
            res.json({
                "status": false,
                "message": error.message
            });
        }
    }

    static updateItem = async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const { itemimg, itemname, itemtags, estimated_cost, found_location, returnto, status, description, contact_info } = req.body;

            const item = await Item.findById(itemId);

            if (!item) {
                return res.json({
                    "status": false,
                    "message": "Item not found."
                });
            }

            // Update item details
            item.itemimg = itemimg || item.itemimg;
            item.itemname = itemname || item.itemname;
            item.itemtags = itemtags || item.itemtags;
            item.estimated_cost = estimated_cost || item.estimated_cost;
            item.found_location = found_location || item.found_location;
            item.returnto = returnto || item.returnto;
            item.status = status || item.status;
            item.description = description || item.description;
            item.contact_info = contact_info || item.contact_info;

            // Save the updated item
            await item.save();

            return res.json({
                "status": true,
                "message": "Item details updated successfully."
            });
        } catch (error) {
            res.json({
                "status": false,
                "message": error.message
            });
        }
    }

    static deleteItem = async (req, res) => {
        try {
            const itemId = req.params.itemId;

            const item = await Item.findById(itemId);

            if (!item) {
                return res.json({
                    "status": false,
                    "message": "Item not found."
                });
            }

            // Delete the item
            await item.remove();

            return res.json({
                "status": true,
                "message": "Item deleted successfully."
            });
        } catch (error) {
            res.json({
                "status": false,
                "message": error.message
            });
        }
    }
}

export default itemController;
