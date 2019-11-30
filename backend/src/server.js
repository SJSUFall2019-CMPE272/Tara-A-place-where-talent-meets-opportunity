"use strict";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import signup from "./routes/signup";
import talent from "./routes/talent";
import login from "./routes/login";
import recruiter from "./routes/recruiter";
import opportunities from "./routes/opportunities";

const app = express();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.set("view engine", "ejs");
// connecting to the front-end
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use("/signup", signup);
app.use("/talent", talent);
app.use("/recruiter", recruiter);
app.use("/login", login);
app.use("/opportunities", opportunities);

app.listen(9000, () => {
  console.log(`Server listening on port 9000`);
});

module.exports = app;
