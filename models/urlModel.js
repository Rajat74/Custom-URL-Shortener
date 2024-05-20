const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true,
        },
        visitHistory: [{timestamp: {type: Number}}],
    },
    { timestamps: true }
);

// Below 'url' is the name of the collection for the given schema.
const URL = mongoose.model('url', urlSchema);

module.exports = URL;