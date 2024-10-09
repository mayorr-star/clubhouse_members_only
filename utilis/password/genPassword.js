const bcrypt = require('bcryptjs');
const salt = 32;
const generatePassword = (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const verifyPassword = (password, hash) => {
  const hashVerify = bcrypt.hashSync(password, salt);
  return hash === hashVerify;
};

module.exports = { generatePassword, verifyPassword };
