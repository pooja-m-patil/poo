var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var request = require("request");
var express1 = require('express-validation');
var router = express.Router();

var route = require('./src/api_calls/route');
var user = require('./src/api_calls/user');
var admin = require('./src/api_calls/admin');
var socketIo = require('socket.io');

var dev = require('./src/api_calls/devices');
var status;
var auth;
var deviceId;
var msg;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


var prompt = require('prompt-sync')();
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

var server = app.listen(3000, function () {
  console.log("Listening on port:3000");
});

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
  },processResponse)

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
});

app.use('/display', route);
app.use('/display', user);
app.use('/display', admin);


// app.post("/connectDevice", function (request, response) {
//   var id=request.body.deviceId;
//   console.log("deviceId"+id);
//   // if(id==dId){
//     response.send({"deviceId":id});
//   // }
// })


module.exports = app;