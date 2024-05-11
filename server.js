require("dotenv").config();
const express = require('express')
const app = express()
const router = require("./routes/auth_router");
const prop = require("./routes/property_router");
const contact = require("./routes/contactus_router");
const userprofile = require("./routes/userProfile_router")
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connect");
const cors = require('cors');
app.use(express.json());
const path = require('path');
// app.use(express.static('uploads/images'));

app.use(cors()); 
app.use("/api/auth", router);
app.use("/api/property", prop);
app.use("/api/contact", contact);
app.use("/api/user", userprofile)
app.use('/profile', express.static('uploads/images'));
// app.use('/profile', express.static(path.join(__dirname, 'uploads', 'images')));



const start = async()=>{
    try{
        await connectDB(process.env.MONGODB_URL_LOCAL);
        app.listen(PORT, ()=>{
            console.log(`Node is running at ${PORT}`);
        })
    }catch (error) {
        console.log(error);
    }
};

start();