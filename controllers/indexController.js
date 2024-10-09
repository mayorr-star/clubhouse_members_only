const getYear = require("../utilis/year");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const year = getYear();

const renderHomePage = asyncHandler(async (req, res) => {
    res.render('index', { year: year, userlogin: false, admin: false })
});

module.exports = { renderHomePage};
