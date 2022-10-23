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

        var user = await Ads.aggregate([
            {
                $lookup: {
                from: "Company",
                localField: "companyId",   
                foreignField: "_id",
                as: "company"  
            }
            },
            {
              $unwind:{path:"$company"}
            },
            {
                $match:{
                    $or: [{primaryText: {$regex: searchTerm, $options : "i"} }, {headline: {$regex: searchTerm, $options : "i"}}, {description: {$regex: searchTerm, $options : "i"}}, {name: {$regex: searchTerm, $options : "i"}}]
                }
            },
            {
                "$project": {
                    "_id": 1,
                    "company": 1,
                    "headline": 1,
                    "primaryText": 1,
                    "description": 1,
                    "imageUrl": 1,
                    "CTA": 1                
                }
            }

        ])

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