//Testing is going to cover a couple of areas:
//1) does the programme take a birthday and accurately convert it for the API search?
//2) does the programme accurately search with the API?
//3) does the programme generate a useable response?

//We then need to consider edge cases:
//1) What if the birthday does not exist?
//2) What if the input is not in the correct format?

const deathSearcher = require("../script");

//WikiMedia API searches using a format of 'monthName_dayNumber' and the standard date
//selector on html gives you YYYY-MM-DD. This checks to convert it to a useable format.
const consoleSpy = jest.spyOn(console, "log");
const testDeathSearcher = new deathSearcher();

describe("date converter", () => {
  it("accepts 2022-12-06", () => {
    const testDate = "2022-12-06";
    testDeathSearcher.convertDate(testDate);
    expect(consoleSpy).toHaveBeenCalledWith("Acceptable input: 2022-12-06");
  });
  it("accepts 2023-12-06", () => {
    const testDate = "2023-12-06";
    testDeathSearcher.convertDate(testDate);
    expect(consoleSpy).toHaveBeenCalledWith("Acceptable input: 2023-12-06");
  });
  it("rejects non-string input", () => {
    const testDate = 2011123;
    testDeathSearcher.convertDate(testDate);
    expect(consoleSpy).toHaveBeenCalledWith("Error - incorrect input");
  });
  it("rejects too short input", () => {
    const testDate = "2022-12-1";
    testDeathSearcher.convertDate(testDate);
    expect(consoleSpy).toHaveBeenCalledWith("Error - incorrect input");
  });
  it("rejects bad format input", () => {
    const testDate = "12-12-2022";
    testDeathSearcher.convertDate(testDate);
    expect(consoleSpy).toHaveBeenCalledWith("Error - incorrect input");
  });
  it("rejects bad format input", () => {
    const testDate = "ag-bo-2022";
    testDeathSearcher.convertDate(testDate);
    expect(consoleSpy).toHaveBeenCalledWith("Error - incorrect input");
  });
  it("accepts 2019-01-03", () => {
    const testDate = "2019-01-03";
    testDeathSearcher.convertDate(testDate);
    expect(consoleSpy).toHaveBeenCalledWith("Acceptable input: 2019-01-03");
  });
  it("accepts 2014-04-10 and converts it to April_10", () => {
    const testDate = "2014-04-10";
    expect(testDeathSearcher.convertDate(testDate)).toEqual("April_10");
  });
  it("accepts 2014-4-10, converts to April_10 and searches via the wikimedia api", () => {
    const testDate = "2014-04-10";
    let convertedDate = testDeathSearcher.convertDate(testDate);
    return testDeathSearcher
      .searchAPI(convertedDate, "wikitext")
      .then((data) => {
        expect(data.pageid).toEqual(2564);
      });
  });
  it("performs the above task and converts the response to a list of deaths", () => {
    const testDate = "2014-04-10";
    let convertedDate = testDeathSearcher.convertDate(testDate);
    return testDeathSearcher
      .searchAPI(convertedDate, "wikitext")
      .then((data) => {
        expect(testDeathSearcher.formatData(data)).toEqual("");
      });
  });
});
