const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected");
    } catch(e) {
        console.log("Error:", e);
        process.exit();
    }
}

module.exports = connectDB;