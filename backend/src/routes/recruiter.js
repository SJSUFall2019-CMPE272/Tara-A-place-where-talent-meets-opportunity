

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
        }
        else {
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
        }
        else {
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
        }
        else {
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
    var docClient = new AWS.DynamoDB.DocumentClient();

    var get_matches_of_talent_params = {
        TableName: "tara-talent-demo",
        ProjectionExpression: "matches",
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames: {
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": talent_id
        }
    };

    var get_matches_of_talent = docClient.query(get_matches_of_talent_params)

    get_matches_of_talent.on('success', function (response) {

        var match_obj_for_this_opportunity_exists = false
        var talent_current_matches = response.data.Items[0].matches;
        for (var i = 0; i < talent_current_matches.length; i++) {

            var match_obj = talent_current_matches[i]

            console.log("match_obj: ", match_obj)
            if (match_obj.opportunity_id == opportunity_id) {
                match_obj_for_this_opportunity_exists = true

                match_obj["recruiterMatch"] = true

                var talent_match_true_params = {
                    TableName: "tara-talent-demo",
                    Key: {
                        "id": talent_id
                    },
                    UpdateExpression: "SET matches = :updated_match",
                    ExpressionAttributeValues: {
                        ":updated_match": talent_current_matches
                    }
                }

                var talent_match_true = docClient.update(talent_match_true_params)

                talent_match_true.on('success', function (response) {
                    console.log(response.data)
                }).
                    on('error', function (error, response) {
                        console.log(error);
                    }).send();

            }

        }

        if (!match_obj_for_this_opportunity_exists) {

            var add_new_match_object_params = {
                TableName: "tara-talent-demo",
                Key: {
                    "id": talent_id
                },
                UpdateExpression: "SET #matches = list_append(#matches, :vals)",
                ExpressionAttributeNames: {
                    "#matches": "matches"
                },
                ExpressionAttributeValues: {
                    ":vals": [{
                        "id": "m" + (Math.floor(Math.random() * 10000)).toString(),
                        "opportunity_id": opportunity_id,
                        "talent_id": talent_id,
                        "talentMatch": false,
                        "recruiterMatch": true
                    }]
                }
            };

            var add_new_match = docClient.update(add_new_match_object_params)
            add_new_match.on('success', function (response) {
                console.log(response.data)
            }).send();

        }

    }).
        on('error', function (error, response) {
            console.log(error);
        }).send();

    res.send(JSON.stringify({ message: "success" }));

});


// to get matches for a specific opportunity
router.get("/matches/:id", function (req, res) {

    var opportunity_id = req.params.id;
    var response_to_send = [];
    var perfect_matches = [];
    var recruiter_matches = [];
    var docClient = new AWS.DynamoDB.DocumentClient();

    var all_talents_data = docClient.scan({ TableName: "tara-talent-demo" })

    all_talents_data.on('success', function (response) {

        if (response.data.ScannedCount > 0) {

            var all_talents = response.data.Items;

            for (var i = 0; i < all_talents.length; i++) {

                var curr_talent = all_talents[i]

                var opp_exists = false;
                for (var j = 0; j < curr_talent.matches.length; j++) {

                    var curr_match_object = curr_talent.matches[j]

                    if (curr_match_object.opportunity_id === opportunity_id) {
                        opp_exists = true

                        if (curr_match_object.recruiterMatch == true && curr_match_object.talentMatch == true) {
                            perfect_matches.push(curr_talent)
                        }

                        if (curr_match_object.recruiterMatch == true && curr_match_object.talentMatch == false) {
                            recruiter_matches.push(curr_talent)
                        }
                    }

                }

                if (!opp_exists) {
                    delete curr_talent.password
                    response_to_send.push(curr_talent)
                }

            }

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ "not_applied": response_to_send, "perfect_matches": perfect_matches, "recruiter_matches": recruiter_matches }, null, 2))



        }
        else {

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ message: "Requested data doesn't exist" }, null, 2))
        }


    }).
        on('error', function (error) {
            console.log(error);
        }).send();

});

module.exports = router;

