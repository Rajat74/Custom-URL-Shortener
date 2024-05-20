const shortid = require("shortid");
const URL = require("../models/urlModel");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    const shortID = shortid();

    // Here we are creating a new entry in database.
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.status(201).json({ 
        id: shortID,
        msg: "Successfully created the Entry in the database",
     });
}

async function handleGetRedirectURL(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory:{
                    timestamp: Date.now(),
                }
            }
        }
    )
    res.status(202).redirect(result.redirectURL);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne(
        { 
            shortId 
        }
    );
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetRedirectURL,
};
