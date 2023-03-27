//Testing is going to cover a couple of areas:
//1) does the programme take a birthday and accurately convert it for the API search?
//2) does the programme accurately search with the API?
//3) does the programme generate a useable response?

//We then need to consider edge cases:
//1) What if the birthday does not exist?
//2) What if the input is not in the correct format?

const deathSearcher = require("./script");

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
  it("rejects 2023-12-06", () => {
    const testDate = "2023-12-06";
    testDeathSearcher.convertDate(testDate);
    expect(consoleSpy).toHaveBeenCalledWith("Error - future date: 2023-12-06");
  });
  it("rejects non-string input", () => {
    const testDate = 2011123;
    testDeathSearcher.convertDate(testDate);
    expect(consoleSpy).toHaveBeenCalledWith("Error - incorrect input");
  });
  it("rejects incorrect input", () => {
    const testDate = "2022-12-1";
    testDeathSearcher.convertDate(testDate);
    expect(consoleSpy).toHaveBeenCalledWith("Error - incorrect input");
  });
});
