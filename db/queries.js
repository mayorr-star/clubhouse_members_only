const pool = require("./pool");

const getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT messages.title, messages.message, messages.date, users.firstname, users.lastname FROM messages INNER JOIN users ON messages.user_id = users.id"
  );
  return rows;
};

module.exports = { getAllMessages };
