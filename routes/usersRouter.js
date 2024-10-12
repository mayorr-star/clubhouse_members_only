const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require('passport');
require('../passport/passport');
const router = Router();

router.get("/sign-up", userController.getSignUpForm);
router.post("/sign-up", userController.createUser);
router.get("/sign-in", userController.getSignInForm);
router.post('/sign-in', passport.authenticate('local', {
    successRedirect: '/messages',
    failureRedirect: '/users/sign-in',
    failureMessage: 'Incorrect email or password'
}));
router.get('/sign-out', (req, res) => {
    req.logout(() => res.redirect('/users/sign-in'));
});
router.get("/become-a-member", userController.getEntryPage);
router.post('/member', userController.updateMembershipStatus);
router.get('/become-an-admin', userController.getAdminForm);
router.post('/admin', userController.updateAdminStatus);

module.exports = router;