const express = require("express");
const cors = require("cors");
var mysql = require("mysql2");

const app = express();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mpsys@1835",
  database: "BookCatalogue",
});
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const PORT = 3600;

// query strings
const createTable =
  "CREATE TABLE IF NOT EXISTS Books (ISBN varchar(13) NOT NULL, name VARCHAR(255), author VARCHAR(255), category varchar(255), description TEXT, price DOUBLE, PRIMARY KEY(ISBN));";

const getAll = "SELECT * FROM Books;";
const saveBook = "INSERT INTO Books VALUES (?, ?, ?, ?, ?, ?)";
const updateBook = "UPDATE Books SET price=? WHERE ISBN=?;";
const deleteBook = "DELETE FROM Books WHERE ISBN=?;";

app.post("/save", (req, res) => {
  // grab the json
  console.log(req.body);
  let { name, author, category, description, price } = req.body;
  con.query(
    saveBook,
    [Date.now(), name, author, category, description, price],
    (err, result) => {
      if (err) {
        res.send("An Error has occured :" + err);
        throw err;
      } else {
        res.status(200);
        res.send("Data saved successfully : " + result.message);
      }
    }
  );
});

app.get("/getAll", (req, res) => {
  con.query(getAll, (err, fields, result) => {
    if (err) {
      res.send("An Error has occured :" + err);
      throw err;
    } else {
      res.status(200);
      res.json(fields);
    }
  });
});


app.put("/update/:id", (req, res) => {
  let price = req.query.price;
  con.query(updateBook, [price, req.params.id], (err, result) => {
    if (err) {
      res.send("An Error has occured :" + err);
      throw err;
    } else {
      res.status(200);
      res.json(result.message);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  con.query(deleteBook, [req.params.id], (err, result) => {
    if (err) {
      res.send("An Error has occured :" + err);
      throw err;
    } else {
      res.status(200);
      if (result.affectedRows) {
        res.json("Succefully Deleted! " + result.message);
      } else res.json("Not in the database!" + result.message);
    }
  });
});

app.listen(PORT, (error) => {
  if (!error) {
    con.connect(function (err) {
      if (err) throw err;
      console.log(
        "server is running on port : " +
          PORT +
          " and database connected successfully"
      );
      con.query(
        "CREATE DATABASE IF NOT EXISTS BookCatalogue",
        function (err, result) {
          if (err) throw err;
          console.log("Result: " + result.message);
        }
      );
      // creating table for books
      con.query(createTable, (err, result) => {
        if (err) throw err;
        console.log("Result: " + result.message);
      });
    });
  } else console.log("Error occurred, server can't start", error);
});

