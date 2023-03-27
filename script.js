class deathSearcher {
  convertDate = (date) => {
    if (this.dateCheck(date)) {
      console.log(`Acceptable input: ${date}`);
      let dateArray = date.split("-");
      const searchDate = new Date();
      searchDate.setMonth(~~dateArray[1] - 1);
      let month = searchDate.toLocaleString("en-US", { month: "long" });
      let day = dateArray[2];
      let convertedDate = `${month}_${day}`;
      return convertedDate;
    } else {
      console.log("Error - incorrect input");
    }
  };
  dateCheck = (date) => {
    if (typeof date === "string" && date.length === 10 && date.includes("-")) {
      let dateArray = date.split("-");
      if (
        dateArray[0].length === 4 &&
        dateArray[1].length === 2 &&
        dateArray[2].length === 2
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  async searchAPI(parameter) {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=${parameter}&prop=wikitext&formatversion=2`;
    let response = await fetch(url);
    let data = await response.json();
    let parsedData = await data.parse.wikitext;
    return parsedData;
  }
}

module.exports = deathSearcher;
