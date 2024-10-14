const { validationResult, body } = require("express-validator");
const db = require("../db/queries");
const { getYear, getDate, getTime } = require("../utilis/year");
const asyncHandler = require("express-async-handler");
const { NotFoundError } = require("../utilis/errorhandling/errors/NotFound");

const year = getYear();

const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await db.getAllMessages();
  if (!messages) {
    throw new NotFoundError("Messages not found");
  }
  res.render("messages", {
    messages: messages,
    user: Boolean(req.user),
    admin: req.user.admin,
    year: year,
    member: req.user.membership_status,
    firstName: req.user.firstname,
  });
});

const renderMessageForm = (req, res) => {
  if (!req.user) {
    throw new NotFoundError("User not found");
  }
  res.render("addMessageForm", {
    user: Boolean(req.user),
    admin: req.user.admin,
    year: year,
    member: req.user.membership_status,
  });
};

const validateMessageInfo = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Message title is required"),
  body("message").trim().notEmpty().withMessage("Message is required")
];

const createNewMessage = [
  validateMessageInfo,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addMessageForm", {
        errors: errors.array(),
        year: year,
        user: req.user,
        admin: req.user.admin,
        member: req.user.membership_status,
      });
    }
    const { title, message } = req.body;
    const dateTime = `${getDate()} ${getTime()}`;
    await db.insertNewMessage(message, title, dateTime, req.user.id);
    res.redirect("/messages");
  }),
];

const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  await db.deleteMessage(messageId);
  res.redirect("/messages");
});

module.exports = {
  getAllMessages,
  renderMessageForm,
  createNewMessage,
  deleteMessage,
};
