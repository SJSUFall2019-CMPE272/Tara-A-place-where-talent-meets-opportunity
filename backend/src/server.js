"use strict";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import signup from "./routes/signup";
import talent from "./routes/talent";
import login from "./routes/login";

const app = express();

app.set("view engine", "ejs");
// connecting to the front-end
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use("/signup", signup);
app.use("/talent", talent);
app.use("/login", login);

app.listen(9000, () => {
  console.log(`Server listening on port 9000`);
});

module.exports = app;
