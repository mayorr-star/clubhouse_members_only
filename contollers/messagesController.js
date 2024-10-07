const db = require("../db/queries");
const getYear = require("../utilis/year");
const asyncHandler = require('express-async-handler');

const year = getYear();

const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", {
    messages: messages,
    userlogin: false,
    admin: false,
    year: year,
  });
});

module.exports = { getAllMessages };
