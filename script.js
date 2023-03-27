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
        ~~dateArray[0] == dateArray[0] &&
        dateArray[1].length === 2 &&
        ~~dateArray[1] == dateArray[1] &&
        dateArray[2].length === 2 &&
        ~~dateArray[2] == dateArray[2]
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  async searchAPI(parameter, format) {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=${parameter}&prop=${format}&formatversion=2`;
    const response = await fetch(url);
    const data = await response.json();
    const parsedData = await data.parse;
    return parsedData;
  }

  isPerson = (element) => {
    return element.includes("&ndash;");
  };

  formatData = (data) => {
    const splitList = data.wikitext
      .split("==Deaths==")[1]
      .split("<!--")[0]
      .split("*");
    const filteredList = splitList.filter(this.isPerson);
    return filteredList;
  };
  formatEntry = (data) => {
    let filteredName = this.filterName(data);
    let name = this.nameCheck(filteredName);
    let info = this.createInfo(data).trim();
    return [name, info];
  };
  nameCheck = (name) => {
    return name.includes("|") ? name.split("|")[0] : name;
  };
  createInfo = (data) => {
    return data.includes("]], ") ? data.split("]], ")[1] : "";
  };
  filterName = (data) => {
    return data.split("[[")[2].split("]]")[0];
  };
}

module.exports = deathSearcher;
