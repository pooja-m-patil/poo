//import { findIndex } from "rxjs/operator/findIndex";

var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var request = require("request");
var express1=require('express-validation');
var router = express.Router();



//var server = require('./server.js');
var route=require('./route');
var socketIo=require('socket.io');
var disc=require('./discovery');
var dev=require('./devices');
var status;
var auth;
var deviceId;
var temp;
var socket1;
var devArray=[];

var server=app.listen(3000, function() {
  console.log("Listening on port:3000");
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/dist')); 


app.use(express.static(__dirname + '/views'));


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



app.use('/display',route);
var devArray=[];

devicesObj={

 
  add:function(uid){
    
    device={
      dId:uid,
      timer:setTimeout(()=>{

        console.log(devArray[0].dId);
        var index=-1;
      for(let i=0;i<devArray.length;i++){
        
        if(devArray[i].dId==uid){
          index=i;
        }
      }
      devArray.splice(index,1);
      console.log(devArray);
      },7000)
    }
    var count=0;
    var index1=-1;

    for(let i=0;i<devArray.length;i++){
      if(uid==devArray[i].dId){
       index1=i;
       console.log("index");
       //clearTimeout(devArray[index1].timer);
       console.log(index1);
       clearTimeout(devArray[index1].timer,function(clear){
         console.log("clear timer");
       })
      //  devArray[index1].timer=setTimeout(()=>{
      
      // devArray.splice(index1,1);
      // console.log("devArray");
      // },7000)

       //console.log("clear timer");
      }
    }
    if(index1==-1){
      devArray.push(device);
      console.log(devArray);
    }
    
     
  
    
  }
  }




var io=socketIo(server);
  
io.on('connection',(socket)=>{
  console.log("A new WebSocket connection has been established");
  socket1=socket;
 })


 app.post("/remoteApp",function(req,res){

  if(req.body.deviceId){
    deviceId=req.body.deviceId;
  }
  if(req.body.added){
    status=true;
    auth=req.body.added;
  }
  if(req.body.id){
    temp=req.body.id;
  }

  
if(status){
  console.log(status);
  console.log(temp);
  console.log(deviceId);
  if(temp==deviceId){
  
  res.send(auth);
  }
  else{
    res.send("");
  }
}
else{
  var dId=req.body.deviceId;
  //console.log(dId);

    dev.devices(dId,function(data){
     // console.log(data.docs);
    
  if(data.bookmark!='nil'){
    if(data.bookmark==undefined){
      res.send("");
      return;
    }
    else{
      console.log(dId);
     
     // console.log(devArray.find(dId));
     // dev.arrayChange(devArray);
    
     devicesObj.add('baner');
  
        // if (!devArray.includes(dId)) {
        //   devArray.push(dId);
        // }
    
      // devArray.observe(){
      //   console.log("changes");
      //   socket1.emit('message', 
      //   devArray
      //  )
      // };

    
      
   
      //console.log(devArray);

    }
}
else{
res.send("Not valid");
return;
}
});
// res.send("");
}
})

app.post('/stop',function(req,res){
  var dId=req.body.deviceId;
  var event=req.body.event;
console.log("stop event");
  io.on('connection',(socket)=>{
  socket1.emit('message', 
      {devId:dId,event:event})
  });
})

module.exports=app;