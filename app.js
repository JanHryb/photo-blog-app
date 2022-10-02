require("dotenv").config();
const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(require("./middleware/autenticationCheck"));
//routing
app.use("/", require("./routes/home"));

//TODO:app.get("*", (req, res) => {});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
