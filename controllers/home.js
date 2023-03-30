import DeathSearcher from "../models/deathSearcher.js";

const HomeController = {
  Index: (req, res) => {
    console.log("index");
    res.render("home/index", {
      person: "",
      info: "",
    });
  },
  Check: async (req, res) => {
    console.log("check");
    const inputDate = req.body.date;
    const resultsArray = await new DeathSearcher().run(inputDate);
    console.log(resultsArray);
    res.render("home/index", {
      person: resultsArray[0],
      info: resultsArray[1],
    });
  },
};

export default HomeController;
