const { Router } = require('express');
const messagesController = require('../controllers/messagesController');
const {isAuthenticated} = require('../controllers/authenticationController');

const router = Router();

router.get('/', isAuthenticated, messagesController.getAllMessages);
router.get('/add-new-message', messagesController.renderMessageForm);
router.post('/add-new-message', messagesController.createNewMessage);
router.post('/delete/:messageId', messagesController.deleteMessage)

module.exports = router;