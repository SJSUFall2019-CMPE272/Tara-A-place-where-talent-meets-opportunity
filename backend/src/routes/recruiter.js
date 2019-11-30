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


  router.post("/match", function (req, res) {

    var opportunity_id = req.body.opportunity_id;
    var talent_id = req.body.talent_id;

    var params = {
        TableName: "tara-match-demo",
        ProjectionExpression: "id, talent_id, opportunity_id, talentMatch",
        FilterExpression: "#talent_id = :talent_id AND #opportunity_id = :opportunity_id",
        ExpressionAttributeNames: {
          "#talent_id": "talent_id",
          "#opportunity_id": "opportunity_id"
        },
        ExpressionAttributeValues: {
          ":talent_id": talent_id,
          ":opportunity_id": opportunity_id
        }
      };

    var docClient = new AWS.DynamoDB.DocumentClient();

    docClient.scan(params, function (err, data) {
        if (err) {
            console.log(err);
            res.status(400).send({
                success: false,
                message: err.message
            });
        } else {

            if(data.Count > 0) {
                var paramsMatch = {
                    TableName: "tara-match-demo",
                    Key:{
                        "id": data.Items[0].id
                    },
                    UpdateExpression: "SET recruiterMatch = :recruiterMatch",
                    ExpressionAttributeValues:{
                        ":recruiterMatch": true
                    }
                };

                docClient.update(paramsMatch, function (err, matchData) {
                    if (err) {
                      console.log(err);
                      
                    } else {
                        console.log(matchData);
                        console.log('Updated match object of talent');
                    }
                  });


                  if(data.Items[0].talentMatch == true) {
                      console.log("perfect match");
                  }

            }

            console.log(data)
            res.status(201).send({
                success: true
            });
        }
    });

});

  module.exports = router;