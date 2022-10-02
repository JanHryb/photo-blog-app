const express = require("express");
const router = express.Router();
const httpStatusCodes = require("../config/httpStatusCodes");

router.get("/", (req, res) => {
  return res.status(httpStatusCodes.OK).render("index");
});

module.exports = router;
