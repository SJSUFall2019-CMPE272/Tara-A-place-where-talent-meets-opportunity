import express from "express";
import AWS from "../utilities/utils";
import constants from "../utilities/constants";
const router = express.Router();
var bcrypt = require('bcrypt');

router.get("/", function(req, res) {
  return res
    .status(constants.STATUS_CODE.SUCCESS_STATUS)
    .send("coming from backend server");
});

router.post("/", function(req, res) {
  
  var talentId = "t" + (Math.floor(Math.random() * 10000)).toString();
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  var docClient = new AWS.DynamoDB.DocumentClient();

  var hashedPassword = bcrypt.hashSync(password, 10);

  var params = {
    TableName: "tara-talent-demo",
    Item: {
      "id": talentId,
      "email": email,
      "name": name,
      "password": hashedPassword
    }
  };


  docClient.put(params, function(err, data) {
    if (err) {
      res.send({
        success: false,
        message: "Error: Couldn't write to DynamoDB"
      });
    } else {      
      res.send({
        success: true,
        message: 'Added talent',
        id: talentId
      });
    }
  });

});

module.exports = router;