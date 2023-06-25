const express = require("express");
const cors = require("cors");
var mysql = require("mysql");

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
const PORT = 3600;

// query strings
const createTable =
  "CREATE TABLE Books (ISBN varchar(13) NOT NULL, name VARCHAR(255), author VARCHAR(255), category varchar(255), description TEXT, price DOUBLE, PRIMARY KEY(ISBN));";

const getAll = "SELECT * FROM Books;";

const updateBook = "UPDATE Books SET price=? WHERE ISBN=?;"
const deleteBook = ""

app.post("/save", (req, res) => {
  // grab the json
  let { name, author, category, description, price } = req.body;
  let addBook = `INSERT INTO Books VALUES (${Date.now()}, ${name}, ${author}, ${category}, ${description}, ${price});`;
   con.query(addBook, (err, result) => {
     if (err) {
      res.send("An Error has occured :" + err);
      throw err
     }else {
      res.status(200);
      res.send("Data saved successfully : " + result.message)
     }
   });
  
  
});

app.get("/getAll", (req, res) => {
   con.query(getAll, (err, result, fields) => {
     if (err) {
       res.send("An Error has occured :" + err);
       throw err;
     } else {
       res.status(200);
       res.json(fields)
     }
   });
});

// app.get("/get", (req, res) => {
//   res.status(200);
//   res.send("Welcome to root URL of Server");
// });

app.put("/update/:id", (req, res) => {
  let price = req.query.price
  con.query(updateBook, [price,id],(err, result) => {
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
  con.query(updateBook, [price, id], (err, result) => {
    if (err) {
      res.send("An Error has occured :" + err);
      throw err;
    } else {
      res.status(200);
      res.json(result.message);
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
          console.dir(result);
        }
      );
      // creating table for books
      con.query(createTable, (err, result) => {
        if (err) throw err;
        console.log("Result: " + result.message);
        console.dir(result);
      });
    });
  } else console.log("Error occurred, server can't start", error);
});

// JSON FOR BOOKS
// { ISBN, Name, Author, Category, description, price}
