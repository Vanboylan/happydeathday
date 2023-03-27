class deathSearcher {
  convertDate = (date) => {
    if (typeof date === "string" && date.length === 10) {
      var dateInput = new Date(date + " GMT");
      if (Date.now() >= dateInput) {
        console.log(`Acceptable input: ${date}`);
      } else {
        console.log(`Error - future date: ${date}`);
      }
    } else {
      console.log("Error - incorrect input");
    }
  };
}

module.exports = deathSearcher;
