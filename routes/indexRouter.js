const { Router } = require("express");
const passport = require("passport");
const messagesController = require("../controllers/messagesController");
const indexController = require("../controllers/indexController");

const router = Router();

router.get("/", messagesController.getAllMessages);

module.exports = router;
