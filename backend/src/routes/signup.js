import express from "express";
import AWS from "../utilities/utils";
import constants from "../utilities/constants";
const router = express.Router();
var bcrypt = require('bcrypt');

router.post("/", function(req, res) {
  
  
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var type = req.body.type;

  var docClient = new AWS.DynamoDB.DocumentClient();

  var hashedPassword = bcrypt.hashSync(password, 10);

  var tableName;
  var id;

  if(type === "talent") {
    tableName = "tara-talent-demo";
    id = "t" + (Math.floor(Math.random() * 10000)).toString();
  }
  else if(type === "recruiter") {
    tableName = "tara-recruiter-demo";
    id = "r" + (Math.floor(Math.random() * 10000)).toString();
  }

  var params = {
    TableName: tableName,
    Item: {
      "id": id,
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
        id: id
      });
    }
  });

});

module.exports = router;