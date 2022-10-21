const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
require('dotenv').config()
const config = require('./config/database');
const cors = require('cors');
const mongoose = require('mongoose');


// Initialize app
const app = express();


app.use(cors({origin:"http://localhost:3000",method:"GET"}))
app.use(express.json())

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));



// Get Company Model
const Company = require('./models/company.js');
mongoose.model('Company');

// // Get Ads Model
const Ads = require('./models/ads');
mongoose.model('Ads');

// Set routes
const search = require('./routes/search');

app.use('/search/', search);


// Start the server
const server = app.listen(port, ()=> {
    console.log(`Server Listening at http://localhost:${port}`)
})