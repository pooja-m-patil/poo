var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require("request");
var bodyParser = require('body-parser');
var conn=require('./admin_calls/conn');
var addDev=require('./admin_calls/IOTDevice');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/requested_conn", function (request, response) {
    
    console.log('requested conn');
    conn.getConnections(function(data){
    response.send(data);
  });
})

app.get("/getIOTDevices", function (request, response) {
  
    addDev.getIOTDevice(function(data){
      response.send(data);
    })
  })

module.exports=app;