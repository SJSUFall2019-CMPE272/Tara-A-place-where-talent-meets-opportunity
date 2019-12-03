import express from "express";
import constants from "../utilities/constants";
import AWS from "../utilities/utils";
const router = express.Router();

router.get("/", function (req, res) {

    var params = {
        TableName: "tara-opportunity-demo",

    };

    var docClient = new AWS.DynamoDB.DocumentClient();

    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // print all the opportunities
            res.send(data.Items);
        }
    }

});


router.get("/:id/applicants", function (req, res) {

    var opportunity_id = req.params.id;
    var applicants = [];

    var docClient = new AWS.DynamoDB.DocumentClient();

    var all_talents_data = docClient.scan({TableName: "tara-talent-demo" })

    all_talents_data.on('success', function (response) {

        var all_talents = response.data.Items;

        for(var i=0; i < all_talents.length; i++) {

            var curr_talent = all_talents[i]

            for(var j=0; j < curr_talent.matches.length; j++) {

                var curr_match_object = curr_talent.matches[j]

                if(curr_match_object.opportunity_id === opportunity_id) {
                    delete curr_talent.password
                    applicants.push(curr_talent)
                }
            }

        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(applicants, null, 2))
        
    }).send();

});


router.get("/:id", function (req, res) {

    var opportunityId = req.params.id;

    var params = {
        TableName: "tara-opportunity-demo",
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames: {
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": opportunityId
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

router.post("/", function (req, res) {

    var age_range = req.body.age_range;
    var created_by = req.body.created_by;
    var description = req.body.description;
    var ethnicity = req.body.ethnicity;
    var expiry_date = req.body.expiry_date;
    var gender = req.body.gender;
    var location = req.body.location;
    var project_name = req.body.project_name;
    var project_type = req.body.project_type;
    var required_documents = req.body.required_documents;
    var required_skills = req.body.required_skills;
    var title = req.body.title;
    var matches = req.body.matches

    var id = "o" + (Math.floor(Math.random() * 10000)).toString();

    var params = {
        TableName: "tara-opportunity-demo",
        Item: {
            "id": id,
            "age_range": age_range,
            "created_by": created_by,
            "description": description,
            "ethnicity": ethnicity,
            "expiry_date": expiry_date,
            "gender": gender,
            "location": location,
            "project_name": project_name,
            "project_type": project_type,
            "required_documents": required_documents,
            "required_skills": required_skills,
            "title": title,
            "matches": matches

        }
    };

    var docClient = new AWS.DynamoDB.DocumentClient();

    docClient.put(params, function (err, data) {
        if (err) {
            console.log(err);
            res.status(400).send({
                success: false,
                message: "Error: Couldn't write to DynamoDB"
            });
        } else {

            res.status(201).send({
                success: true,
                message: 'Created opportunity successfully',
                id: id
            });
        }
    });

});

module.exports = router;