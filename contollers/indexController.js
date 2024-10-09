const getYear = require("../utilis/year");
const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');
const { generatePassword } = require('../utilis/password/genPassword');
const db = require('../db/queries');

const year = getYear();

const getSignUpForm = asyncHandler((req, res) => {
  res.render("signupForm", { year: year, userlogin: false, admin: false });
});

const getSignInForm = asyncHandler((req, res) => {
  res.render('signInForm', { year: year, userlogin: false, admin: false })
})

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name must contain only alphabets").escape(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name must contain only alphabets").escape(),
  body('email').isEmail().withMessage('Email is invalid').normalizeEmail(),
  body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
  body('confirmPassword').custom((value, {req}) => {{
    return value === req.body.password;
  }}).withMessage('Passwords do not match')
];

const createUser = [
  validateUser, asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('signupForm', {errors: errors.array(), year: year, userlogin: false, admin: false});
    }
    const { firstName, lastName, email, password} = req.body;
    const saltHash = generatePassword(password);
    await db.insertNewUser(firstName, lastName, email, saltHash);
  })
]


module.exports = { getSignUpForm, getSignInForm, createUser };
