var AWS = require("aws-sdk");

AWS.config.update({region: "us-east-1", endpoint: "https://dynamodb.us-east-1.amazonaws.com"});

var dynamodb = new AWS.DynamoDB();

module.exports=AWS;

//import AWS from "../utilities/utils";