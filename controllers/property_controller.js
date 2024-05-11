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

// GET property to compare api
const getPropertyToCompare = async (req, res) => {
    try {
        const { property_one_id, property_two_id } = req.body;

        if (!property_one_id || !property_two_id) {
            return res.status(400).json({ message: "Both property IDs are required" });
        }

        const [propertyOne, propertyTwo] = await Promise.all([
            Property.findById(property_one_id),
            Property.findById(property_two_id)
        ]);

        if (!propertyOne || !propertyTwo) {
            return res.status(404).json({ message: "One or more properties not found" });
        }

        res.status(200).json({ propertyOne, propertyTwo });
    } catch(error) {
        console.error("Error in getPropertyToCompare:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// GET property for sale api
const getPropertyFromType = async (req, res) => {
    try {
        const { propertyType } = req.body;

        const properties = await Property.find({ property_purpose: propertyType });

        res.status(200).json({ properties });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET property for sale api
const getPropertyForSale = async (req, res) => {
    try {

        const properties = await Property.find({ property_purpose: "propertyForSale" });

        res.status(200).json({ properties_for_sale });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET property for rent api
const getPropertyForRent = async (req, res) => {
    try {

        const properties = await Property.find({ property_purpose: "propertyForRent" });

        res.status(200).json({ properties_for_rent });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET land for sale api
const getLandForSale = async (req, res) => {
    try {

        const properties = await Property.find({ property_purpose: "landForSale" });

        res.status(200).json({ properties_for_rent });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET property by user id api
const getPropertyByUserId = async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: "userID is required." });
        }

        const properties = await Property.find({ user_id: user_id });


        res.status(200).json({ properties });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createProperty, getProperty, deleteProperty, updateProperty, getPropertyById, 
    getPropertyToCompare, getPropertyFromType, getPropertyForSale, getPropertyForRent, getLandForSale, getPropertyByUserId };