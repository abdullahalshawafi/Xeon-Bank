const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8080;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/Bank-System';

async function db(URI) {
    await mongoose.connect(URI);
    console.log('Connected to DB');
}

db(DB_URI).catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(require('./routes'));

app.listen(PORT, err => {
    if (err) return console.error(err);
    console.log(`Server started listening at port ${PORT}`);
});