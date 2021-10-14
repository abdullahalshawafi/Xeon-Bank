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

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(require('./routes'));
app.use('/messages', require('./routes/messages'));
app.use('/customers', require('./routes/customers'));
app.use('/transactions', require('./routes/transactions'));

app.listen(PORT, err => {
    if (err) return console.error(err);
    console.log(`Server started listening at port ${PORT}`);
});