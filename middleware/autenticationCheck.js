module.exports = (req, res, next) => {
  res.locals.authenticated = false; //req.isAuthenticated();
  return next();
};
