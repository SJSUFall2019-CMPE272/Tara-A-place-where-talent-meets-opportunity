import express from "express";
import constants from "../utilities/constants";
import AWS from "../utilities/utils";
const router = express.Router();


// router.get("/", function(req, res) {
//     return res
//       .status(constants.STATUS_CODE.SUCCESS_STATUS)
//       .send("talent API entry point");
//   });

router.get("/", function (req, res) {

    var params = {
        TableName: "tara-talent-demo",

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
    //console.log(req.body.itemValues);
    console.log(req.body.itemValues.address);

    var params = {
        TableName: "tara-talent-demo",
        Key:{
            "id": talentId
        },
        UpdateExpression: "set address = :a, contact = :c, experience = :e, gender = :g, gps = :gps, media = :m, skills = :s",
        ExpressionAttributeValues:{
            ":a": req.body.itemValues.address,
            ":c": req.body.itemValues.contact,
            ":e": req.body.itemValues.experience,
            ":g": req.body.itemValues.gender,
            ":gps": req.body.itemValues.gps,
            ":m": req.body.itemValues.media,
            ":s": req.body.itemValues.skills
        },
        ReturnValues:"UPDATED_NEW"
    };

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.update(params, function(err, data) {
        if (err) {
            
            res.send(err)
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));

        } else {
            res.status(200).send({
                success: true,
                message: 'Item updated successfully'
              });
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
    
  });

module.exports = router;