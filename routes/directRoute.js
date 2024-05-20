const express = require("express");
const { handleGetRedirectURL } = require("../controllers/urlController");

const router = express.Router();

router.get("/:shortId", handleGetRedirectURL);

module.exports = router;
