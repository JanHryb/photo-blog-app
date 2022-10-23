const express = require("express");
const router = express.Router();
const httpStatusCodes = require("../config/httpStatusCodes");
const Post = require("../models/Post");
const auth = require("../config/auth");
const formValidator = require("../utils/formValidator");

router.get("/view/:id", async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.find({ _id: postId }).populate("user_id");
    if (post.length > 0) {
      return res
        .status(httpStatusCodes.OK)
        .render("post/view", { post: post[0] });
    } else {
      return next();
    }
  } catch (err) {
    return next();
  }
});

router.get("/update/:id", auth.authenticated, async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user._id.toString();
  try {
    const post = await Post.find({ _id: postId }).populate("user_id");
    if (post.length > 0) {
      if (userId == post[0].user_id._id.toString()) {
        return res
          .status(httpStatusCodes.OK)
          .render("post/update", { post: post[0] });
      } else {
        return next();
      }
    } else {
      return next();
    }
  } catch (err) {
    return next();
  }
});

router.get("/add", auth.authenticated, (req, res) => {
  return res.status(httpStatusCodes.OK).render("post/add");
});

router.post("/update/:id", async (req, res) => {
  const postId = req.params.id;
  let { title, description, imageUrl } = req.body;
  title = formValidator.capitalizeFirstLetter(title);
  description = formValidator.capitalizeFirstLetter(description);
  if (formValidator.hasWhiteSpace(imageUrl)) {
    req.flash("error", "image URL can't contain space");
    return res.status(httpStatusCodes.BadRequest).redirect(req.originalUrl);
  }
  if (title.length < 5) {
    req.flash("error", "title should contain at least 5 characters");
    return res.status(httpStatusCodes.BadRequest).redirect(req.originalUrl);
  }
  if (title.length > 80) {
    req.flash("error", "title shouldn't be longer than 80 characters");
    return res.status(httpStatusCodes.BadRequest).redirect(req.originalUrl);
  }
  if (description.length < 10) {
    req.flash("error", "description should contain at least 10 characters");
    return res.status(httpStatusCodes.BadRequest).redirect(req.originalUrl);
  }
  try {
    const update = await Post.findByIdAndUpdate(
      { _id: postId },
      { title, description, image_url: imageUrl }
    );
    req.flash("success", "post has been updated");
    return res.status(httpStatusCodes.Created).redirect("/user");
  } catch (err) {
    return res.status(httpStatusCodes.BadRequest).redirect(req.originalUrl);
  }
});

router.post("/add", async (req, res) => {
  let { title, description, imageUrl } = req.body;
  title = formValidator.capitalizeFirstLetter(title);
  description = formValidator.capitalizeFirstLetter(description);
  if (formValidator.hasWhiteSpace(imageUrl)) {
    req.flash("error", "image URL can't contain space");
    return res.status(httpStatusCodes.BadRequest).render("post/add", req.body);
  }
  if (title.length < 5) {
    req.flash("error", "title should contain at least 5 characters");
    return res.status(httpStatusCodes.BadRequest).render("post/add", req.body);
  }
  if (title.length > 80) {
    req.flash("error", "title shouldn't be longer than 80 characters");
    return res.status(httpStatusCodes.BadRequest).render("post/add", req.body);
  }
  if (description.length < 10) {
    req.flash("error", "description should contain at least 10 characters");
    return res.status(httpStatusCodes.BadRequest).render("post/add", req.body);
  }
  try {
    const post = await Post.create({
      title,
      description,
      image_url: imageUrl,
      user_id: req.user._id,
    });
    req.flash("success", "post has been created");
    return res.status(httpStatusCodes.Created).redirect("/user");
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user._id.toString();
  try {
    const post = await Post.find({ _id: postId }).populate("user_id");
    if (post.length > 0) {
      if (userId == post[0].user_id._id.toString()) {
        await Post.findByIdAndDelete(postId);
        req.flash("success", "post has been deleted");
        return res.status(httpStatusCodes.OK).json({ redirect: "/user" });
      }
    } else {
      throw new Error("empty set");
    }
  } catch (err) {
    return res
      .status(httpStatusCodes.BadRequest)
      .json({ err: "something went wrong" });
  }
});

module.exports = router;
