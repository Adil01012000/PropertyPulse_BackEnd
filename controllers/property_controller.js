const Property = require("../models/Property");

// POST property api
const createProperty = async (req, res) => {
    try {

        const property = await Property.create({ ...req.body });
        res.status(200).json({ message: "Property created successfully", property });
    } catch(error) {
        if (error.code === 11000 || error.code ===11001){
            res.status(400).json({ message: "Duplicate entry. Property already exists." });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// GET property api
const getProperty = async (req, res) => {
    try {
        const properties = await Property.find();

        res.status(200).json({ properties });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE property api
const deleteProperty = async (req, res) => {
    try {
        const propertyId = req.body._id;
        if (!propertyId){
            return res.status(400).json({ message: "Property ID is missing!" });
        }

        const property = await Property.findById(propertyId);
        if (!property){
            return res.status(404).json({ message: "Property not found" });
        }

        await Property.findByIdAndDelete(propertyId);
        res.status(200).json({ message: "Property deleted successfully" });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE property api
const updateProperty = async (req, res) => {
    try {
        const propertyId = req.body._id;
        const updates = req.body;

        const property = await Property.findById(propertyId);
        if (!property){
            return res.status(404).json({ message: "Property not found" });
        }

        Object.assign(property, updates);

        const updateProperty = await property.save();
        res.status(200).json({ message: "Property updated successfully", updateProperty });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET property by id api
const getPropertyById = async (req, res) => {
    try {
        const propertyId = req.body._id;
        if (!propertyId){
            return res.status(400).json({ message: "Property ID is missing!" });
        }

        const property = await Property.findById(propertyId);
        if (!property){
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json({ property });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProperty, getProperty, deleteProperty, updateProperty, getPropertyById };