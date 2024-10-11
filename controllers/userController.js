const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { getYear } = require("../utilis/year");
const db = require("../db/queries");
const { generatePassword } = require("../utilis/password/genPassword");
require("dotenv").config();

const year = getYear();

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name must contain only alphabets")
    .escape(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name must contain only alphabets")
    .escape(),
  body("email").isEmail().withMessage("Email is invalid").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirmPassword")
    .custom((value, { req }) => {
      {
        return value === req.body.password;
      }
    })
    .withMessage("Passwords do not match"),
];

const createUser = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signupForm", {
        errors: errors.array(),
        year: year,
        user: Boolean(req.user),
        admin: false,
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const saltHash = generatePassword(password);
    await db.insertNewUser(firstName, lastName, email, saltHash);
    res.redirect("/users/sign-in");
  }),
];

const getEntryPage = asyncHandler((req, res) => {
  res.render("join", { year: year, user: Boolean(req.user), admin: false });
});

const getSignUpForm = asyncHandler((req, res) => {
  res.render("signupForm", {
    year: year,
    admin: false,
    user: Boolean(req.user),
    member: false,
  });
});

const getSignInForm = asyncHandler((req, res) => {
  res.render("signInForm", {
    year: year,
    admin: false,
    user: Boolean(req.user),
    member: false,
  });
});

const validateMemberCode = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Membership code is required")
    .custom((value) => {
      return value === process.env.MEMBERSHIP_SECRET_CODE;
    })
    .withMessage("Sorry incorrect passcode"),
];

const validateAdminCode = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Admin password is required")
    .custom((value) => {
      return value === process.env.ADMIN_SECRET_CODE;
    })
    .withMessage("Sorry incorrect passcode"),
];

const updateMembershipStatus = [
  validateMemberCode,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("join", {
        errors: errors.array(),
        year: year,
        user: Boolean(req.user),
        admin: req.user.admin,
      });
    }
    const messages = await db.getAllMessages();
    await db.updateMembershipStatus("TRUE", req.user.id);
    res.render("messages", {
      year: year,
      user: Boolean(req.user),
      admin: req.user.admin,
      messages: messages,
      member: req.user.membership_status,
    });
  }),
];

const getAdminForm = asyncHandler(async (req, res) => {
  res.render("adminForm", {
    year: year,
    admin: req.user.admin,
    user: Boolean(req.user),
    member: req.user.membership_status,
  });
});

const updateAdminStatus = [
  validateAdminCode,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("adminForm", {
        errors: errors.array(),
        year: year,
        user: Boolean(req.user),
        admin: req.user.admin,
        member: req.user.membership_status,
      });
    }
    const messages = await db.getAllMessages();
    await db.updateAdminStatus("TRUE", req.user.id);
    res.render("messages", {
      year: year,
      admin: req.user.admin,
      user: Boolean(req.user),
      member: req.user.membership_status,
      firstName: req.user.firstname,
      messages: messages
    });
  }),
];

module.exports = {
  getEntryPage,
  getSignInForm,
  getSignUpForm,
  getAdminForm,
  createUser,
  updateMembershipStatus,
  updateAdminStatus,
};
