import express from "express";
import constants from "../utilities/constants";
import AWS from "../utilities/utils";
const router = express.Router();


// router.get("/", function(req, res) {
//     return res
//       .status(constants.STATUS_CODE.SUCCESS_STATUS)
//       .send("talent API entry point");
//   });


// to get particular profile
router.get("/:id", function (req, res) {

    var talentId = req.params.id;

    var params = {
        TableName: "tara-talent-demo",
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames: {
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": talentId
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

router.post("/:id", function(req, res) {
    
    var talentId = req.params.id;
    console.log(talentId);
    console.log(req.body.itemValues);

    var params = {
        TableName:table,
        Key:{
            "id": talentId
        },
        UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
        ExpressionAttributeValues:{
            ":r":5.5,
            ":p":"Everything happens all at once.",
            ":a":["Larry", "Moe", "Curly"]
        },
        ReturnValues:"UPDATED_NEW"
    };
    

  });

module.exports = router;