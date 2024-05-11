const Property = require("../models/Property");

// // POST property api
// const createProperty = async (req, res) => {
//     try {
//         const propertyData = {
//             "property_title": "Beautiful Villa with Ocean View",
//             "property_description": "Spacious villa overlooking the ocean, perfect for a peaceful getaway.",
//             "property_purpose": "Sale",
//             "property_category": ["Villa", "Luxury"],
//             "property_listed_in": "Residential",
//             "property_price": 1000000,
//             "property_yearly_tax_rate": "5%",
//             "property_status": "Available",
//             "property_after_price_label": "per annum",
//             "property_address": "123 Ocean Drive",
//             "property_state": "California",
//             "property_country": "USA",
//             "property_city": "Los Angeles",
//             "property_zip_code": "90001",
//             "property_size": "5000 sqft",
//             "property_rooms": "8",
//             "property_bedrooms": "4",
//             "property_baths": "3",
//             "property_garage": "Yes",
//             "property_garage_size": "2 cars",
//             "property_year_built": "2010",
//             "property_available_from": "Immediately",
//             "property_basement": "No",
//             "property_structure_type": "Villa",
//             "property_amenities": ["Swimming Pool", "Garden", "Balcony"]
//         };

//         const property = await Property.create({ ...req.body });
//         res.status(200).json({ message: "Property created successfully", property });
//     } catch(error) {
//         if (error.code === 11000 || error.code ===11001){
//             res.status(400).json({ message: "Duplicate entry. Property already exists." });
//         } else {
//             res.status(500).json({ message: error.message });
//         }
//     }
// };

async function createProperty(req, res) {
    try {
        // Map profile image URLs
        const profileImages = req.files.map(file => `http://localhost:5000/profile/${file.filename}`);
        const existingProperty = await Property.findOne({ property_title: req.body.property_title });

        if (existingProperty) {
            return res.status(400).json({ error: "Property with the same title already exists." });
        }
        // console.log(profileImages);
        // Construct profile data
        const profileData = {
            property_images: profileImages, // Assuming you want to store multiple images
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

        // Create a new Property object
        const newProfile = new Property(profileData);

        // Save the profile
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