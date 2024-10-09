const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy();
const { getUserByEmail, getUserById } = require("../db/queries");
const { verifyPassword } = require('../utilis/password/genPassword');

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = (username, password, cb) => {
  try {
    const user = getUserByEmail(username)[0];

    if (!user) {
      return cb(null, false, { message: "Incorrect username or password." });
    }

    const isPasswordValid = verifyPassword(password, hash, salt);
    
    if (!isPasswordValid) {
      return cb(null, false, { message: "Incorrect username or password." });
    } else {
      return cb(null, user);
    }
  } catch (err) {
    return cb(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = getUserById(id)[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
