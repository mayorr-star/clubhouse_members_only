const bcrypt = require("bcryptjs");
const salt = 10;
const generatePassword = (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const verifyPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { generatePassword, verifyPassword };
