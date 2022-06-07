require("dotenv").config();
const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");
// tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACKURL,
    },
    // accessing credentials from google
    function (accessToken, refreshToken, profile, done) {
      // find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log(`Error in google strategy passport : ${err}`);
          return;
        }
        console.log(profile);
        if (user) {
          // if found set this user as req.user
          return done(null, user);
        } else {
          // if not found create the user and set it as req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: profile.displayName,
            },
            function (err, user) {
              if (err) {
                console.log("error in creating google strategy-passport", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);
