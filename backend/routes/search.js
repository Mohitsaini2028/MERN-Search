const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Get models

const Company = require('../models/company.js');
mongoose.model('Company');

const Ads = require('../models/ads');
mongoose.model('Ads');




router.get('/', async function (req, res) {

    var searchTerm = req.query.term;
    searchTerm = searchTerm.trim();

    var adsResult = await Ads.find({$or: [{primaryText: {$regex: searchTerm, $options : "i"} }, {headline: {$regex: searchTerm, $options : "i"}}, {description: {$regex: searchTerm, $options : "i"}}]}); 

    return res.status(200).json(
        {
            Result : adsResult
        }
    );

});


// Exports
module.exports = router;