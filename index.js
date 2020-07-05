const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

const app = express();

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Get schemas from package
const {
  newtContentSchema,
  newtSeriesSchema,
  newtContentCreatorSchema,
  newtSourceSchema,
} = require("newt-content-models");

// Add Newt Content models
mongoose.model("newt-content", newtContentSchema);
mongoose.model("newt-series", newtSeriesSchema);
mongoose.model("newt-content-creators", newtContentCreatorSchema);
mongoose.model("newt-sources", newtSourceSchema);


app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.send({ message: "Welcome to Newt Internal Tools." })
);

// Require routes
require("./routes")(app);

const PORT = process.env.PORT || 9000;
app.listen(PORT);
