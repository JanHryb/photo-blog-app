const express = require("express");
const router = express.Router();
const httpStatusCodes = require("../config/httpStatusCodes");
const formValidator = require("../utils/formValidator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");
const auth = require("../config/auth");

router.get("/", auth.authenticated, async (req, res) => {
  return res.status(httpStatusCodes.OK).render("user/profile", req.user);
});

router.get("/profile", (req, res) => {
  return res.status(httpStatusCodes.OK).redirect("/user");
});

router.get("/login", auth.notAuthenticated, (req, res) => {
  return res.status(httpStatusCodes.OK).render("user/login");
});

router.get("/register", auth.notAuthenticated, (req, res) => {
  return res.status(httpStatusCodes.OK).render("user/register");
});

router.get("/logout", auth.authenticated, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next();
    }
    req.flash("success", "you are logged out");
    return res.redirect("/user/login");
  });
});

router.post("/register", async (req, res) => {
  let = { first_name, last_name, email, password, password_repeat } = req.body;
  first_name = formValidator.capitalizeFirstLetter(first_name);
  last_name = formValidator.capitalizeFirstLetter(last_name);
  email = email.toLowerCase();

  if (formValidator.hasWhiteSpace(first_name)) {
    req.flash("error", "first name can't contain space");
    return res
      .status(httpStatusCodes.BadRequest)
      .render("user/register", req.body);
  }
  if (formValidator.hasWhiteSpace(last_name)) {
    req.flash("error", "last name can't contain space");
    return res
      .status(httpStatusCodes.BadRequest)
      .render("user/register", req.body);
  }
  if (formValidator.hasWhiteSpace(email)) {
    req.flash("error", "email can't contain space");
    return res
      .status(httpStatusCodes.BadRequest)
      .render("user/register", req.body);
  }
  if (first_name.length < 3) {
    req.flash("error", "first name should contain at least 3 characters");
    return res
      .status(httpStatusCodes.BadRequest)
      .render("user/register", req.body);
  }
  if (last_name.length < 2) {
    req.flash("error", "last name should contain at least 2 characters");
    return res
      .status(httpStatusCodes.BadRequest)
      .render("user/register", req.body);
  }
  if (password.length < 6) {
    req.flash("error", "password should contain at least 6 characters");
    return res
      .status(httpStatusCodes.BadRequest)
      .render("user/register", req.body);
  }
  if (password !== password_repeat) {
    req.flash("error", "passwords aren't equal");
    return res
      .status(httpStatusCodes.BadRequest)
      .render("user/register", req.body);
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "user with that email already exist");
      return res
        .status(httpStatusCodes.BadRequest)
        .render("user/register", req.body);
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
      }
      const user = await User.create({
        first_name,
        last_name,
        email,
        password: hash,
      });
      req.flash("success", "account has been created");
      return res.status(httpStatusCodes.Created).redirect("/user/login");
    });
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    // successRedirect: "/user",
    failureRedirect: "/user/login",
    failureFlash: true,
  }),
  (req, res) => {
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 14; //cookie expires after 14 days
    } else {
      req.session.cookie.maxAge = null; // cookie expires at end of session
    }
    return res.status(httpStatusCodes.OK).redirect("/user");
  }
);

module.exports = router;
