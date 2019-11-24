import express from "express";
import AWS from "../utilities/utils";
import constants from "../utilities/constants";
const router = express.Router();
var bcrypt = require('bcrypt');

router.post("/", function (req, res) {
  console.log("in login");
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
  var type = req.body.type;
  var tableName;
  var docClient = new AWS.DynamoDB.DocumentClient();

  if (type === "talent") {
    tableName = "tara-talent-demo";
  }
  else if (type === "recruiter") {
    tableName = "tara-recruiter-demo";
  }


  var params = {
    TableName: tableName,
    ProjectionExpression: "password, id",
    FilterExpression: "#email = :user_email",
    ExpressionAttributeNames: {
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":user_email": email
    }
  };

  docClient.scan(params, onScan);

  function onScan(err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Scan succeeded.");
      var storedHash = data.Items[0].password;
      var id = data.Items[0].id;
      if (bcrypt.compareSync(password, storedHash)) {
        console.log("matched");
        res.status(200).send({
          success: true,
          message: '200',
          id: id,
          type: type
        });
      } else {
        console.log("unmatched");
        res.status(400).send({
          success: false,
          message: 'Login failed'
        });
      }
    }
  }

});

module.exports = router;