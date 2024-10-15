const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const userRouter = require('./routes/usersRouter');
const messageRouter = require('./routes/messageRouter');
const pool = require("./db/pool");
const handleError  = require('./utilis/errorhandling/middlewares/handleNotFoundError');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const seesionStore = new pgSession({
  pool: pool,
  createTableIfMissing: true,
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  session({
    store: seesionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use('/users', userRouter);
app.use('/messages', messageRouter);
app.use("/", indexRouter);

app.use(handleError.handleNotFoundError);
// app.use(handleError.handleServerError);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
