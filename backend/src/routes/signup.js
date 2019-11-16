import express from "express";
import AWS from "../utilities/utils";
import constants from "../utilities/constants";
const router = express.Router();

router.get("/", function(req, res) {
  return res
    .status(constants.STATUS_CODE.SUCCESS_STATUS)
    .send("coming from backend server");
});

router.post("/", function(req, res) {
  
  var talentId = "t" + (Math.floor(Math.random() * 10000)).toString();
  var name = req.body.name;
  var email = req.body.email;

  console.log(req.body);
  console.log(name);
  console.log(email);

  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "tara-talent-demo",
    Item: {
      "id": talentId,
      "email": email,
      "name": name
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
        id: talentId,
        email: email,
        name: name
      });
    }
  });

});

module.exports = router;