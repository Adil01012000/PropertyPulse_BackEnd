const ContactUs = require("../models/ContactUs");

// POST contact-us api
const createContactUs = async (req, res) => {
    try {

        const contactus = await ContactUs.create({ ...req.body });
        res.status(200).json({ message: "Query Sent Successfully", contactus });
    } catch(error) {
        if (error.code === 11000 || error.code ===11001){
            res.status(400).json({ message: "Duplicate entry. Property already exists." });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = { createContactUs };