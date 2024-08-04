const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json()); // Add this to parse JSON bodies

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@8770271287hassu",
  database: "sub",
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

let createRandomUser = () => {
  return [
    faker.datatype.uuid(), // id
    faker.internet.userName(), // username
    faker.internet.email(), // email
    faker.internet.password(), // password
  ];
};

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/", (req, res) => {
  const q = "SELECT COUNT(*) FROM number";
  connection.query(q, (err, result) => {
    if (err) throw err;
const count =result[0]['COUNT(*)']
    res.render("index.ejs", { count });
  });
});

app.get("/user", (req, res) => {
  const q = "SELECT * FROM number";
  connection.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database query failed");
    }
    res.render("showusers.ejs", { result });
  });
});

// app.get("/user/:id/edit", (req, res) => {
//   const { id } = req.params;
//   const q = "SELECT * FROM number WHERE id = ?";
//   connection.query(q, [id], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Database query failed");
//     }
//     const user = result[0];
//     res.render("edit.ejs", { user });
//   });
// });

// app.patch("/user/:id", (req, res) => {
//   const { id } = req.params;
//   const { username: formUsername, password: formPassword } = req.body;

//   const q = "SELECT * FROM number WHERE id = ?";
//   connection.query(q, [id], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Database query failed");
//     }
//     const user = result[0];
//     if (formPassword !== user.password) {
//       return res.status(400).send("Wrong password");
//     }
//     const q2 = "UPDATE number SET username = ? WHERE id = ?";
//     connection.query(q2, [formUsername, id], (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send("Database query failed");
//       }
//       res.redirect("/user");
//     });
//   });
// });
