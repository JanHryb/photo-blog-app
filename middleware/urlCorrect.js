module.exports = (req, res, next) => {
  const url = req.originalUrl;
  if (url != "/" && url[url.length - 1] == "/") {
    let correctUrl = url.replace(/\/+$/, "");
    if (correctUrl == "") {
      correctUrl = "/";
    }
    if (correctUrl.length > 2) {
      if (correctUrl[0] == "/" && correctUrl[1] == "/") {
        return next();
      }
    }
    return res.redirect(correctUrl);
  }
  return next();
};
