const express = require("express"); //To mange request and rouths
const morgan = require("morgan"); //HTTP request middleware logger for Node. js
const bodyParser = require("body-parser"); //process data sent through an HTTP request body
const mysql = require("mysql2");
var cors = require("cors");
const app = express();
const Routes = require("./query"); //routes to query
const db = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6686277",
  password: "XgDDJ78TjR",
  database: "sql6686277",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/nurse", Routes);

const port = 9000;
app.listen(port, () => console.log(`Server started on port ${port}`));
