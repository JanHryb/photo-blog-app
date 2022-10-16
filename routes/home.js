const express = require("express");
const router = express.Router();
const httpStatusCodes = require("../config/httpStatusCodes");
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    let posts = await Post.find({}).populate("user_id");
    // console.log(posts[0]._id.toString());
    const postsPerPage = 6;
    const pagesNum = Math.ceil(posts.length / postsPerPage);
    let pageQueryParam = Number(req.query.page) || 1;
    const start = (pageQueryParam - 1) * postsPerPage;
    const end = start + postsPerPage;
    if (posts.slice(start, end).length == 0 || pageQueryParam < 0) {
      return res.redirect("/");
    } else {
      posts = posts.slice(start, end);
    }
    return res
      .status(httpStatusCodes.OK)
      .render("index", { posts, pageQueryParam, pagesNum });
  } catch (err) {
    console.log(err);
  }
});

router.get("/blog", (req, res) => {
  return res.status(httpStatusCodes.OK).redirect("/");
});

module.exports = router;
