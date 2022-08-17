const mongoose = require('mongoose');
const {configs} = require('../configs');

const connectMongoDB = async () => {
    try {
       await mongoose.connect(configs.mongoURI)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Failed to Connect :', error.message);
        process.exit(1);
    }
}

module.exports = connectMongoDB;