const mongoose = require('mongoose');
const crypto = require('crypto');
const { type } = require('os');

const propertySchema = new mongoose.Schema({
    property_images: [String],
    // property_image_one: {
    //     type: String,
    // },
    // property_image_two: {
    //     type: String,
    // },
    // property_image_three: {
    //     type: String,
    // },
    // property_image_four: {
    //     type: String,
    // },
    // property_image_five: {
    //     type: String,
    // },
    property_user_id: {
        type: String,
    },
    property_title: {
        type: String,
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
        type: String,
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
    property_basement: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
