const { Router } = require("express");
const messagesController = require("../contollers/messagesController");
const indexController = require('../contollers/indexController');

const router = Router();

router.get("/", messagesController.getAllMessages);
router.get("/sign-up", indexController.getSignUpForm);

module.exports = router;
