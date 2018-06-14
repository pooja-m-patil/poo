var express = require("express");
var app = express();

var prompt = require('prompt-sync')();
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

// Set up Assistant service wrapper.
var service = new AssistantV1({
    username: 'bf080d0a-4a64-425d-a931-27a0b1d8803a', // replace with service username
    password: '5LLFJtgO403m', // replace with service password
    version: '2018-02-16'
});

var workspace_id = 'fd970b5d-c53d-4ced-b0ca-517efc5d8f0c'; // replace with workspace ID

app.post("/welcome_assistant", function (request, res) {

    service.message({
        workspace_id: workspace_id
    }, processResponse);


    function processResponse(err, response) {
        if (err) {
            console.error(err);
            return;
        }

        if (response.output.text.length != 0) {
            console.log(response.output.text[0]);
            res.send(response.output.text[0]);
        }
    }
})

app.post("/watson_assistant", function (request, res) {

    var input = request.body.msg;

    console.log(input);
    var newMessageFromUser = input;

    service.message({
        workspace_id: workspace_id,
        input: { text: newMessageFromUser },
    }, processResponse)

    function processResponse(err, response) {
        if (err) {
            console.error(err);
            return;
        }

        if (response.output.text.length != 0) {
            console.log(JSON.stringify(response, null, 2));
            console.log(response.output.text[0]);
            res.send(response.output.text[0]);
        }
    }
});

module.exports = app;