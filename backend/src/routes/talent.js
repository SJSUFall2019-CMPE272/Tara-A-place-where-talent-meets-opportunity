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
            data.Items.forEach(function (talent) {
                console.log(talent);
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

router.post("/:id", function (req, res) {
    console.log(req.body);
    var talentId = req.params.id;

    var params = {
        TableName: "tara-talent-demo",
        Key: {
            "id": talentId
        },
        UpdateExpression: "set address = :a, contact = :c, experience = :e, gender = :g, media = :m, skills = :s",
        ExpressionAttributeValues: {
            ":a": req.body.address,
            ":c": req.body.contact,
            ":e": req.body.experience,
            ":g": req.body.gender,
            ":m": req.body.media,
            ":s": req.body.skills
        }
    };

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.update(params, function (err, data) {
        if (err) {

            res.send(err)
            console.error("Unable to update talent item. Error JSON:", JSON.stringify(err, null, 2));

        } else {
            res.status(200).send({
                success: true,
                message: 'Item updated successfully'
            });
            console.log("Talent UpdateItem succeeded");
        }
    });

});

module.exports = router;