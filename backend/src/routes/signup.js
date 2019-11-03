import express from "express";
import constants from "../utilities/constants";
const router = express.Router();

router.get("/", function(req, res) {
  return res
    .status(constants.STATUS_CODE.SUCCESS_STATUS)
    .send("coming from backend server");
});

module.exports = router;
