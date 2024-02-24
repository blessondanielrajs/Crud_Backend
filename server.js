// const http = require("http");
// const fs = require("fs");
// const path = require("path");
// const mysql = require("mysql2");

// // MySQL database connection configuration
// const db = mysql.createConnection({
//   host: "sql6.freesqldatabase.com",
//   user: "sql6686277",
//   password: "XgDDJ78TjR",
//   database: "sql6686277",
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL database:", err);
//     return;
//   }
//   console.log("Connected to MySQL database");
// });

// const PORT = process.env.PORT || 8000;

// const server = http.createServer((req, res) => {
//   console.log(`${req.method} request for ${req.url}`);

//   fs.readFile(path.join(__dirname, "query.js"), (err, data) => {
//     if (err) {
//       res.writeHead(500);
//       return res.end("Error loading index.html");
//     }

//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end(data);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

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
