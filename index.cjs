const express = require("express");

const app = express();
const PORT = 3600;

app.post("/save", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.get("/getAll", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.get("/get", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.put("/update", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.delete("/delete", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running and App is listening on : " + PORT
    );
  } else console.log("Error occurred, server can't start", error);
});
