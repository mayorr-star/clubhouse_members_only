const { Router } = require("express");
const messagesController = require("../contollers/messagesController");
const indexController = require('../contollers/indexController');

const router = Router();

router.get("/", messagesController.getAllMessages);
router.get("/sign-up", indexController.getSignUpForm);
router.post('/sign-up', indexController.createUser);

module.exports = router;
