const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated())
    return res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  next();
};

module.exports = { isAuthenticated };
