const mongoose = require("mongoose");



const connectDB = async (uri) => {
    try {
      await mongoose.connect(uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); // Exit process with failure
    }
  };


module.exports = connectDB