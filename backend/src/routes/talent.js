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

// to get opportunities for a specific talent
router.get("/:id/opportunities", function (req, res) {

    var talentId = req.params.id;

    var opportunities = [];
    var all_opportunities = [];
    var response_to_send = {}

    var docClient = new AWS.DynamoDB.DocumentClient();

    var get_all_opportunities_params = {
        TableName: "tara-opportunity-demo"
    }

    var all_opportunities_data = docClient.scan(get_all_opportunities_params)

    all_opportunities_data.on('success', function (response) {

        all_opportunities = response.data.Items;

        var get_matches_params = {
            TableName: "tara-talent-demo",
            ProjectionExpression: "matches",
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": talentId
            }
        };
    
        var matchesData = docClient.query(get_matches_params)
    
        matchesData.on('success', function (response) {
    
            var all_talent_matches = response.data.Items[0].matches

            if(all_talent_matches.length > 0) {
                var match_opp_ids = []
                for (var i = 0; i < all_talent_matches.length; i++) {
                    match_opp_ids[i] = all_talent_matches[i].opportunity_id
                }

                for (var i = 0; i < all_opportunities.length; i++) {
                    var curr_opportunity = all_opportunities[i]
                    var exists = match_opp_ids.includes(curr_opportunity.id)
                    if(exists) {
                        delete all_opportunities[i]
                    }
                }

            }
            var filtered = all_opportunities.filter(function (el) {
                return el != null;
              });

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(filtered, null, 2))
    
        }).send();

    }).
        on('error', function (error, response) {
            console.log(error);
        }).send();


    

});

function sendResult(res, opportunities) {
    res.send(opportunities)
}

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
            if (data.Count > 0) {
                console.log("Query succeeded.");
                console.log(data)
                delete data.Items[0].password;
                res.send(data.Items);
            }
            else {

                res.send('{"Message": "No results"}');
            }
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
        UpdateExpression: "set address = :a, contact = :c, experience = :e, gender = :g, media = :m, skills = :s, matches = :matches",
        ExpressionAttributeValues: {
            ":a": req.body.address,
            ":c": req.body.contact,
            ":e": req.body.experience,
            ":g": req.body.gender,
            ":m": req.body.media,
            ":s": req.body.skills,
            ":matches": []
        }
    };

    var docClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
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


router.post("/:id/match", function (req, res) {

    var talentId = req.params.id;
    var docClient = new AWS.DynamoDB.DocumentClient();
    var talent_current_matches = [];

    var get_matches_of_talent_params = {
        TableName: "tara-talent-demo",
        ProjectionExpression: "matches",
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames: {
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": talentId
        }
    };

    var get_matches_of_talent = docClient.query(get_matches_of_talent_params)

    get_matches_of_talent.on('success', function (response) {

        console.log("matches for talent received")

        var match_obj_for_this_opportunity_exists = false

        talent_current_matches = response.data.Items[0].matches;
        console.log("response.data: ", response.data)
        console.log("talent_current_matches: ", talent_current_matches)
        for (var i = 0; i < talent_current_matches.length; i++) {

            var match_obj = talent_current_matches[i]

            console.log("match_obj: ", match_obj)
            if (match_obj.opportunity_id == req.body.opportunity_id) {
                match_obj_for_this_opportunity_exists = true

                match_obj["talentMatch"] = true

                var talent_match_true_params = {
                    TableName: "tara-talent-demo",
                    Key: {
                        "id": talentId
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
                    "id": talentId
                },
                UpdateExpression: "SET #matches = list_append(#matches, :vals)",
                ExpressionAttributeNames: {
                    "#matches": "matches"
                },
                ExpressionAttributeValues: {
                    ":vals": [{
                        "id": "m" + (Math.floor(Math.random() * 10000)).toString(),
                        "opportunity_id": req.body.opportunity_id,
                        "talent_id": talentId,
                        "talentMatch": true,
                        "recruiterMatch": false
                    }]
                }
            };

            var add_new_match = docClient.update(add_new_match_object_params)
            add_new_match.on('success', function (response) {
                console.log(response.data)
            }).send();

        }




    }).send();



    /*  var matchId = "m" + (Math.floor(Math.random() * 10000)).toString();
     console.log(req.body)
     var params = {
         TableName: "tara-talent-demo",
         Key: {
             "id": talentId
         },
         UpdateExpression: "SET #matches = list_append(#matches, :vals)",
         ExpressionAttributeNames: {
             "#matches": "matches"
         },
         ExpressionAttributeValues: {
             ":vals": [{
                 "id": matchId,
                 "opportunity_id": req.body.opportunity_id,
                 "talent_id": talentId,
                 "talentMatch": true
             }]
         }
     };
     console.log("updated in talent");
     var docClient = new AWS.DynamoDB.DocumentClient();
     docClient.update(params, function (err, data) {
         if (err) {
             console.log(err);
 
         } else {
 
             var paramsOppor = {
                 TableName: "tara-opportunity-demo",
                 Key: {
                     "id": req.body.opportunity_id
                 },
                 UpdateExpression: "SET #matches = list_append(#matches, :vals)",
                 ExpressionAttributeNames: {
                     "#matches": "matches"
                 },
                 ExpressionAttributeValues: {
                     ":vals": [{
                         "id": matchId,
                         "opportunity_id": req.body.opportunity_id,
                         "talent_id": talentId,
                         "talentMatch": true
                     }]
                 }
             };
 
             docClient.update(paramsOppor, function (err, data) {
                 if (err) {
                     console.log(err);
 
                 } else {
 
                     console.log("Updated match object of opporunity")
 
                 }
             });
 
 
             res.status(201).send({
                 success: true,
                 message: 'Created a match object',
                 id: matchId
             });
         }
     }); */



});

module.exports = router;
