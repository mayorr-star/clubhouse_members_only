const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../db/queries");
const { verifyPassword } = require("../utilis/password/genPassword");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await db.getUserByEmail(username);
      const user = result[0];

      if (!user) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }

      const isPasswordValid = verifyPassword(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      } else {
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const result = await db.getUserById(userId);
    const user = result[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
