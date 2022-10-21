const mongoose = require('mongoose');

// Ads Schema
const Schema = mongoose.Schema;

const AdsSchema = new Schema({
   
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required: true
    },
    primaryText: {
        type: String,
        required: true
    },
    headline: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    CTA: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Ads = mongoose.model('Ads', AdsSchema);
module.exports = Ads; 

