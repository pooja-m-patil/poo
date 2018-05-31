var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require("request");
var bodyParser = require('body-parser');
var conn=require('./admin_calls/conn');
var addDev=require('./admin_calls/addDevice');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/requested_conn", function (request, response) {
    
    console.log('requested conn');
    conn.getConnections(function(data){
    response.send(data);
  });
})

app.post("/addReq", function (request, response) {
    
  var id=request.body.id;
  var classname=request.body.classname;
  var description=request.body.description;
  
    addDev.addDevice(id,classname,description,function(data){
      response.send(data.authToken);
    })
  })

module.exports=app;