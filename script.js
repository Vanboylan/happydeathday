import { deathSearcher } from "./models/deathSearcher.js";
const searchBtn = document.querySelector(".search");
const dateInput = document.querySelector(".date");
const result = document.querySelector(".result");
const person = document.querySelector(".person");
const info = document.querySelector(".info");
const express = require("express");
const app = express();
const port = proccess.env.PORT || 3000;

const search = (date) => {
  let newSearch = new deathSearcher();
  return newSearch.run(date);
};

searchBtn.addEventListener("click", async function () {
  let results = await search(dateInput.value);
  console.log(results);
  person.textContent = results[0];
  info.textContent = results[1];
  result.classList.remove("hidden");
});

app.get("/", (req, res) => {
  res.render("/index");
});

app.listen(port, () => {
  console.log(`listening on PORT${port}`);
});

module.exports = app;
