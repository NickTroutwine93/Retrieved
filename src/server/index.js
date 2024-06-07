// server/index.js

/*
import firebase from "firebase/app";
import "firebase/firestore";
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const pd = require('./parsingGMUData');
const mockData = require('./mock.json');

app.get("/api", (req, res) => {
  let success = req.query.success;
  let hunters = req.query.hunters;
  let harvest = req.query.harvest;
  console.log(mockData,success,hunters,harvest)
  var fakeResponse = pd.parsingGMUData(mockData,success,hunters,harvest);
  console.log(fakeResponse,"s",success,"h",hunters)
  res.json({ message: fakeResponse });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
*/
// Import the functions you need from the SDKs
//console.log(process.env);