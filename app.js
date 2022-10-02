require("dotenv").config();
require("./config/database");
const express = require("express");
const httpStatusCodes = require("./config/httpStatusCodes");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(require("./middleware/autenticationCheck"));
app.use(require("./middleware/urlCorrect"));
//routing
app.use("/", require("./routes/home"));

app.get("*", (req, res) => {
  return res.status(httpStatusCodes.NotFound).render("notFound");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
