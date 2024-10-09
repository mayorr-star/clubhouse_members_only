const { Router } = require("express");
const passport = require("passport");
const userController = require("../controllers/userController");
const router = Router();

router.get("/sign-up", userController.getSignUpForm);
router.post("/sign-up", userController.createUser);
router.get("/sign-in", userController.getSignInForm);
router.get("/become-a-member", userController.getEntryPage);