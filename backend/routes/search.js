const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Get models

const Company = require('../models/company.js');
mongoose.model('Company');

const Ads = require('../models/ads');
const ad = mongoose.model('Ads');




router.get('/', async function (req, res) {

    var searchTerm = req.query.term;
    searchTerm = searchTerm.trim();
   
    try{

        var company = await Company.find({name: {$regex: searchTerm, $options : "i"}}, {"_id": 1});    
        var user = await Ads.find({$or: [{primaryText: {$regex: searchTerm, $options : "i"} }, {headline: {$regex: searchTerm, $options : "i"}}, {description: {$regex: searchTerm, $options : "i"}}, {companyId: {$in: company}}]}).populate("companyId");
        
        return res.status(200).json(
            {
                Result : user
            })
    
    }
    catch(error){
         console.log(error);
        return res.json({
            Result : undefined
        }
        )
    }

});


// Exports
module.exports = router;