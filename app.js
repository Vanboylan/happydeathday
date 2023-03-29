import express from "express";
import path from "path";
const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 3000;
import homeRouter from "./routes/home.js";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname + "/public"));
app.use("/", homeRouter);

app.listen(port, () => {
  console.log(`listening on PORT${port}`);
});

export default app;
