class deathSearcher {
  convertDate = (date) => {
    var dateInput = new Date(date + " GMT");
    if (Date.now() >= dateInput) {
      console.log(`Acceptable input: ${date}`);
    } else {
      console.log(`Error - future date: ${date}`);
    }
  };
}

module.exports = deathSearcher;
