class deathSearcher {
  convertDate = (date) => {
    if (this.dateCheck(date) === true) {
      console.log(`Acceptable input: ${date}`);
      let dateArray = date.split("-");
      const searchDate = new Date();
      searchDate.setMonth(~~dateArray[1] - 1);
      let month = searchDate.toLocaleString("en-US", { month: "long" });
      let day = dateArray[2];
      let convertedDate = `${month}_${day}`;
      console.log(convertedDate);
      return convertedDate;
    } else {
      console.log("Error - incorrect input");
    }
  };
  dateCheck = (date) => {
    let dateInput = new Date(date + " GMT");
    if (
      typeof date === "string" &&
      date.length === 10 &&
      Date.now() >= dateInput &&
      date.includes("-")
    ) {
      let dateArray = date.split("-");
      if (
        dateArray[0].length === 4 &&
        dateArray[1].length === 2 &&
        dateArray[2].length === 2
        // &&
        // dateArray.forEach((string) => {
        //     ~~string == string;
        // })
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
}

module.exports = deathSearcher;
