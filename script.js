import { deathSearcher } from "./deathSearcher.js";
const searchBtn = document.querySelector(".search");
const dateInput = document.querySelector(".date");
const result = document.querySelector(".result");
const person = document.querySelector(".person");
const info = document.querySelector(".info");

const search = (date) => {
  let newSearch = new deathSearcher();
  return newSearch.run(date);
};

searchBtn.addEventListener("click", async function () {
  let results = await search(dateInput.value);
  result.classList.remove("hidden");
  console.log(results);
  person.textContent = results[0];
  info.textContent = results[1];
});
