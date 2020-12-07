const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const PORT = 3001;

// middleware
app.use(express.static(__dirname + "/../client/public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

// route
app.post("/registration", function (req, res) {
  let userData = req.body;
  db.registerUser(userData, (err, result) => {
    if (err) {
      res.status(401);
      res.send(err);
    } else {
      res.status(201);
      res.send();
    }
  });
});

// start server
app.listen(3001, function () {
  console.log(`listening on port: ${PORT}`);
});
