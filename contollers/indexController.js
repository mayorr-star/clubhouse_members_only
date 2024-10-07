const getYear = require("../utilis/year");
const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');

const year = getYear();

const getSignUpForm = asyncHandler((req, res) => {
  res.render("signupForm", { year: year, userlogin: false, admin: false });
});

module.exports = { getSignUpForm };
