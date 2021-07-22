// module of connection to the database.
const mongoose = require('mongoose');
const config = require('../config/config.json');

const url = process.env.MONGO_URL || config.MONGO_URL;
const connection = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in:', url);
});

mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error:', err);
});

module.exports = connection;