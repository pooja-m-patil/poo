var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require("request");
var bodyParser = require('body-parser');
var conn=require('./admin_calls/conn');
var addDev=require('./admin_calls/IOTDevice');
var confirm=require('./admin_calls/confirmUserReq');
//var del=require('./admin_calls/delRegDev');
var getDev=require('./admin_calls/getConfirmedDev')

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

app.post("/confirmReq", function (request, response) {

  var uname=request.body.username;
  var locname=request.body.locationname;
  var lat=request.body.latitude;
  var lng=request.body.longitude;
  var dId=request.body.deviceId;

  confirm.confirmUserReq(uname,locname,lat,lng,dId,function(data){
    response.send(data);
  })
})

// app.delete("/delRegD", function (request, response) {
//   var dId=request.body.dId;
//   del.delRegDev(dId,function(data){
//     response.send(data);
//   })
// })

app.get('/getConfirmedDevices',function(request,response){
  getDev.userConnDevices(function(data){
      response.send(data);
  })
})

module.exports=app;