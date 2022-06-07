const User = require("../models/user");

// pages controllers
exports.signUpPage = (req, res) => {
  return res.render("sign-up");
};
exports.signInPage = (req, res) => {
  return res.render("sign-in");
};
exports.forgotPasswordPage = (req, res) => {
  return res.render("forgot-password");
};
exports.userProfilePage = (req, res) => {
  if (req.isAuthenticated()) return res.render("user-profile");
  return res.render("sign-in");
};
exports.changePasswordPage = (req, res) => {
  if (req.isAuthenticated()) return res.render("change-password");
  return res.render("sign-in");
};

exports.homepage = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("user-profile");
  }
  return res.render("sign-in");
};

// Signing up user
exports.signUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  const userExists = await User.findOne({ email });
  if (userExists) return res.redirect("/sign-in");

  const user = new User({ name: name, email: email, password: password });
  user.save();

  return res.status(200).send({ msg: "User Saved" });
};
exports.createSession = (req, res) => {
  return res.status(200).send({ msg: "User Found" });
};
exports.createGoogleSession = (req, res) => {
  return res.redirect("/user-profile");
};

// change password
exports.changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const email = req.user.email;
  const user = await User.findOne({ email });
  if (user.password !== currentPassword) {
    return res
      .status(200)
      .send({ msg: "Old Password don't match", type: "error" });
  }

  user.password = newPassword;
  user.save();

  return res.status(200).send({ msg: "Signout Success", type: "success" });
};

// signout
exports.signOut = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.render("sign-in");
  });
};

// forgot password
exports.forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(200).send({ msg: "No User found", type: "error" });
  user.password = newPassword;
  user.save();

  return res.status(200).send({ msg: "Signout Success", type: "success" });
};
