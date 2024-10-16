const pool = require("./pool");

const getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT messages.id, messages.title, messages.message, messages.date, users.firstname, users.lastname FROM messages INNER JOIN users ON messages.user_id = users.id"
  );
  return rows;
};

const getUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows;
};

const getUserById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows;
};

const insertNewUser = async (firstName, lastName, email, password) => {
  await pool.query(
    "INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, email, password]
  );
  return;
};

const insertNewMessage = async (message, title, date, userId) => {
  await pool.query(
    "INSERT INTO messages (message, title, date, user_id) VALUES ($1, $2, $3, $4)",
    [message, title, date, userId]
  );
  return;
};

const updateMembershipStatus = async (value, userId) => {
  await pool.query(
    "UPDATE ONLY users SET membership_status = $1 WHERE id = $2",
    [value, userId]
  );
  return;
};

const updateAdminStatus = async (value, userId) => {
  await pool.query(
    "UPDATE ONLY users SET admin = $1 WHERE id = $2",
    [value, userId]
  );
  return;
};

const deleteMessage = async (messsageId) => {
  await pool.query('DELETE FROM ONLY messages WHERE id = $1', [messsageId]);
  return;
}

module.exports = {
  getAllMessages,
  getUserByEmail,
  getUserById,
  insertNewUser,
  insertNewMessage,
  updateMembershipStatus,
  updateAdminStatus,
  deleteMessage
};
