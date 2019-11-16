import express from "express";
import constants from "../utilities/constants";
import AWS from "../utilities/utils";
const router = express.Router();

router.get("/", function(req, res) {
    return res
      .status(constants.STATUS_CODE.SUCCESS_STATUS)
      .send("talent API entry point");
  });

router.get("/:id", function(req, res) {
    
    var talentId = req.params.id;

    var params = {
        TableName : "tara-talent-demo",
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames:{
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": talentId
        }
    };

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            res.send(data.Items);
        }
    });

  });


router.post("/", function(req, res) {
    return res
      .status(constants.STATUS_CODE.SUCCESS_STATUS)
      .send(req.body.email);
});

module.exports = router;