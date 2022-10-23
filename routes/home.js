const express = require("express");
const router = express.Router();
const httpStatusCodes = require("../config/httpStatusCodes");
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    let posts = await Post.find({}).populate("user_id").sort({ createdAt: -1 });
    const postsPerPage = 6;
    const pagesNum = Math.ceil(posts.length / postsPerPage);
    let pageQueryParam = Number(req.query.page) || 1;
    const start = (pageQueryParam - 1) * postsPerPage;
    const end = start + postsPerPage;
    if (posts.length == 0) {
      return res.status(httpStatusCodes.OK).render("index", { error: true });
    }
    if (posts.slice(start, end).length == 0 || pageQueryParam < 0) {
      return res.redirect("/");
    } else {
      posts = posts.slice(start, end);
    }
    return res
      .status(httpStatusCodes.OK)
      .render("index", { error: false, posts, pageQueryParam, pagesNum });
  } catch (err) {
    console.log(err);
  }
});

router.get("/blog", (req, res) => {
  return res.status(httpStatusCodes.OK).redirect("/");
});

module.exports = router;
