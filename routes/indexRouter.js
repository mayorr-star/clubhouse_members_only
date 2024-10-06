const {Router} = require('express');
const messagesController = require('../contollers/messagesController');

const router = Router();

router.get('/', messagesController.getAllMessages)

module.exports = router;