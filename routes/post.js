const express = require("express");
const router = express.Router();
const httpStatusCodes = require("../config/httpStatusCodes");
const Post = require("../models/Post");

router.get("/:id", (req, res) => {
  const postId = req.params.id;
  res.json(postId);
});

module.exports = router;
