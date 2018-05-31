var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require("request");
var bodyParser = require('body-parser');
var req=require('./user_calls/reqconn');
//var conn=require('./_calls/conn')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/reqconn", function (request, response) {
    
    var username=request.body.username;
    var devicename=request.body.devicename;
    var classname=request.body.classname;
    var description=request.body.description;
    console.log('user req');

    req.reqDevice(username,devicename,classname,description,function(data){

    response.send(data);
  });
})

// app.post("/requested_conn", function (request, response) {
    
//   console.log('requested conn');
//   conn.getConnections(function(data){
//   response.send(data);
// });
//})


  module.exports=app;