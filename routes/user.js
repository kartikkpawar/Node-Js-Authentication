const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  createSession,
  homepage,
  signUpPage,
  signInPage,
  forgotPasswordPage,
  signUpUser,
  userProfilePage,
  changePasswordPage,
  changePassword,
  signOut,
  forgotPassword,
  createGoogleSession,
} = require("../controllers/user");

// rendering pages
router.get("/", homepage);
router.get("/sign-up", signUpPage);
router.get("/sign-in", signInPage);
router.get("/user-profile", userProfilePage);
router.get("/forgot-password", forgotPasswordPage);
router.get("/change-password", changePasswordPage);

// main routes
router.post("/signup-user", signUpUser);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  createSession
);
router.patch("/change-password", changePassword);
router.patch("/forgot-password", forgotPassword);
router.get("/signout", signOut);

// Google auth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/sign-in" }),
  createGoogleSession
);

module.exports = router;
