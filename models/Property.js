const mongoose = require('mongoose');
const crypto = require('crypto');
const { type } = require('os');

const propertySchema = new mongoose.Schema({
    property_title: {
        type: String,
        required: true,
        unique: true,
    },
    property_description: {
        type: String,
        required: true,
        maxLength: 5000,
    },
    property_purpose: {
        type: String,
        required: true,
    },
    property_category: {
        type: [String],
        required: true,
    },
    property_listed_in: {
        type: String,
        required: true,
    },
    property_price: {
        type: Number,
        required: true,
    },
    property_yearly_tax_rate: {
        type: String,
        required: true,
    },
    property_status: {
        type: String,
        required: true,
    },
    property_after_price_label: {
        type: String,   
        required: true,
    },
    property_address: {
        type: String,
        required: true,
    },
    property_state: {
        type: String,
        required: true,
    },
    property_country: {
        type: String,
        required: true,
    },
    property_city: {
        type: String,
        required: true,
    },
    property_zip_code: {
        type: String,
        required: true,
    },
    property_size: {
        type: String,
    },
    property_rooms: {
        type: String,
    },
    property_bedrooms: {
        type: String,
    },
    property_baths: {
        type: String,
    },
    property_garage: {
        type: String,
    },
    property_garage_size: {
        type: String,
    },
    property_year_built: {
        type: String,
    },
    property_available_from: {
        type: String,
    },
    property_basement: {
        type: String,
    },
    property_structure_type: {
        type: String,
    },
    property_amenities: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;