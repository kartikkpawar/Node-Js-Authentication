require("dotenv").config();
const db = require("./config/mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const googlePassport = require("./config/passport-google");

const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const PORT = process.env.PORT || 8000;

// ejs setup
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("views", "./views");

// body-parser middleware
app.use(bodyParser.json());
// cookie-parser middleware
app.use(cookieParser());

// flash messages
app.use(flash());

app.use(
  session({
    name: process.env.NAME,
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(require("./routes/user"));

app.listen(PORT, () => console.log("Server running on", PORT));
