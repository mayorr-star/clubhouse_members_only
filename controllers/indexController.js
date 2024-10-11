const { getYear } = require("../utilis/year");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const year = getYear();

const renderHomePage = asyncHandler(async (req, res) => {
    const member = req.user ? (req.user.membership_status || false) : false;
    const admin = req.user ? (req.user.admin || false) : false;
    res.render('index', { year: year, user: Boolean(req.user), admin: admin, member: member })
});

module.exports = { renderHomePage};
