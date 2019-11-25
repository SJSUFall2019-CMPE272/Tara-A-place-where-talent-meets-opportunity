import express from "express";
import constants from "../utilities/constants";
import AWS from "../utilities/utils";
const router = express.Router();

router.get("/", function (req, res) {

    var params = {
        TableName: "tara-recruiter-demo",

    };

    var docClient = new AWS.DynamoDB.DocumentClient();

    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // print all the opportunities
            console.log("Scan succeeded.");
            data.Items.forEach(function (opportunity) {
                console.log(opportunity);
            });
            res.send(data.Items);
        }
    }

});

// to get details about specific recruiter
router.get("/:id", function (req, res) {

    var recruiterId = req.params.id;

    var params = {
        TableName: "tara-recruiter-demo",
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames: {
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": recruiterId
        }
    };

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            delete data.Items[0].password;
            res.send(data.Items);
        }

    });

  });

// to get all the opportunities created by the recruiter
router.get("/:id/opportunities", function (req, res) {

    var recruiterId = req.params.id;

    var params = {
        TableName: "tara-opportunity-demo",
        FilterExpression: 'created_by = :created_by',
        ExpressionAttributeValues: {
          ":created_by": recruiterId
        }
    };

    var docClient = new AWS.DynamoDB.DocumentClient();
    
    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // print all the opportunities
            console.log("Scan succeeded.");
            data.Items.forEach(function (opportunity) {
                console.log(opportunity);
            });
            res.send(data.Items);
        }
    }

  });

  module.exports = router;