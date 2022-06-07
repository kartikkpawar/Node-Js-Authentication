const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          console.log("Error in finding user ---> LOCAL STRATEGY");
          return done(err);
        }
        if (!user || user.password !== password) {
          console.log("Invalid user name password ---> LOCAL STRATEGY");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serializing user ---> decide which key to keep in cookie

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// de-serializing user ---> using  key from cookies

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("Error in finding user ---> LOCAL STRATEGY");
      return done(err);
    }
    return done(null, user);
  });
});

// check authenticatiton

passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
