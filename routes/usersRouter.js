const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require('passport');
require('../passport/passport');
const router = Router();

router.get("/sign-up", userController.getSignUpForm);
router.post("/sign-up", userController.createUser);
router.get("/sign-in", userController.getSignInForm);
router.post('/sign-in', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign-in'
}))
router.get("/become-a-member", userController.getEntryPage);

module.exports = router;