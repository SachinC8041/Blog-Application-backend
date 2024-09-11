const mongoose = require('mongoose');
require('dotenv').config();

const mongourl = process.env.dburl;
mongoose.connect(mongourl);
const db = mongoose.connection;
db.on('connected', () => {
    console.log('MongoDB connected successfully');
});

