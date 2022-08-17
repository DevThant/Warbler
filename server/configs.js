if ( process.env.Node_ENV !== 'production') {
    require('dotenv').config()
}

const username = process.env.MONGO_USERNAME || 'admin';
const password = process.env.MONGO_PASSWORD || '';


module.exports.configs = {
    mongoURI: `mongodb+srv://${username}:${password}@cluster0.li6vu9y.mongodb.net/?retryWrites=true&w=majority`,
    port : process.env.PORT || 3000,
    saltFactor : 10,
}