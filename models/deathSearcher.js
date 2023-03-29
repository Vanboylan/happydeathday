export class DeathSearcher {
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
    return typeof date === "string" && date.length === 10 && date.includes("-");
  };

  async searchAPI(parameter) {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=${parameter}&prop=wikitext&formatversion=2`;
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

  pickRandom = (list) => {
    return Math.floor(Math.random() * list.length);
  };

  formatEntry = (data) => {
    let num = this.pickRandom(data);
    let selection = data[num];
    let filteredName = this.filterName(selection);
    let name = this.nameCheck(filteredName);
    let info = this.removeEndline(
      this.removeRef(
        this.removeSquareBrackets(this.createInfo(selection).trim())
      )
    );
    return [name, info];
  };

  nameCheck = (name) => {
    return name.includes("|") ? name.split("|")[0] : name;
  };

  createInfo = (data) => {
    return data.includes("]], ") ? data.split("]], ")[1] : "";
  };

  filterName = (data) => {
    console.log(data);
    return data.split("&ndash; [[")[1].split("]]")[0];
  };

  removeRef = (info) => {
    return info.includes("<ref>") ? info.split("<")[0] : info;
  };

  removeSquareBrackets = (info) => {
    return info.includes("[") ? info.replace(/[\[\]']+/g, "") : info;
  };

  removeEndline = (info) => {
    return info.includes("===") ? info.split("===")[0] : info;
  };

  async run(date) {
    let convertedDate = this.convertDate(date);
    let result = await this.searchAPI(convertedDate);
    let formattedResult = await this.formatData(result);
    let entry = await this.formatEntry(formattedResult);
    return entry;
  }
}

export default DeathSearcher;
