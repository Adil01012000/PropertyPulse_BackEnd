const Property = require("../models/Property");

async function createProperty(req, res) {
    try {
        // const profileImages = req.files.map(file => `http://localhost:5000/profile/${file.filename}`);
        const existingProperty = await Property.findOne({ property_title: req.body.property_title });

        if (existingProperty) {
            return res.status(400).json({ error: "Property with the same title already exists." });
        }
        const profileData = {
            // property_images: profileImages, 
            property_image_one: req.body.property_image_one,
            property_image_two: req.body.property_image_two,
            property_image_three: req.body.property_image_three,
            property_image_four: req.body.property_image_four,
            property_image_five: req.body.property_image_five,
            property_user_id: req.body.user_id,
            property_title: req.body.property_title, 
            property_description: req.body.property_description,
            property_purpose: req.body.property_purpose,
            property_category: req.body.property_category,
            property_listed_in: req.body.property_listed_in,
            property_price: req.body.property_price,
            property_yearly_tax_rate: req.body.property_yearly_tax_rate,
            property_status: req.body.property_status,
            property_after_price_label: req.body.property_after_price_label,
            property_address: req.body.property_address,
            property_state: req.body.property_state,
            property_country: req.body.property_country,
            property_city: req.body.property_city,
            property_zip_code: req.body.property_zip_code,
            property_size: req.body.property_size,
            property_rooms: req.body.property_rooms,
            property_bedrooms: req.body.property_bedrooms,
            property_baths: req.body.property_baths,
            property_garage: req.body.property_garage,
            property_garage_size: req.body.property_garage_size,
            property_year_built: req.body.property_year_built,
            property_available_from: req.body.property_available_from,
            property_basement: req.body.property_basement,
        };

        const newProfile = new Property(profileData);

        const savedProfile = await newProfile.save();
        return res.json(savedProfile);
    } catch (error) {
        console.error("Error creating profile:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

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

        res.status(200).json({ properties });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET property for rent api
const getPropertyForRent = async (req, res) => {
    try {

        const properties = await Property.find({ property_purpose: "propertyForRent" });

        res.status(200).json({ properties });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET land for sale api
const getLandForSale = async (req, res) => {
    try {

        const properties = await Property.find({ property_purpose: "landForSale" });

        res.status(200).json({ properties });
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

        const properties = await Property.find({ property_user_id: user_id });


        res.status(200).json({ properties });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createProperty, getProperty, deleteProperty, updateProperty, getPropertyById, 
    getPropertyToCompare, getPropertyFromType, getPropertyForSale, getPropertyForRent, getLandForSale, getPropertyByUserId };