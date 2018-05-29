var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var request = require("request");
var express1 = require('express-validation');
var router = express.Router();

var route = require('./route');
var socketIo = require('socket.io');
var disc = require('./discovery');
var dev = require('./devices');
var status;
var auth;
var deviceId;
var temp;
var socket1;
var initArray=[];

var server = app.listen(3000, function () {
  console.log("Listening on port:3000");
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/display', route);

devicesObj = {
  devArray: [],
  find: function (uid) {
    return this.devArray.findIndex(dev => dev.uid === uid);
  },
  splice: function (uid) {
    this.devArray.splice(this.find(uid), 1);
  },
  pick: function () {
    return this.devArray.map(device => device.uid);
  },
  emit: function () {
    initArray=this.devArray.slice(0);
    socket1.emit("Available devices", this.pick());
  },
  setTimer: function (uid) {
    return setTimeout(() => {
      this.splice(uid);
      this.emit();
    }, 8000)
  },
  resetTimer: function (uid) {
    let timer = this.devArray[this.find(uid)].timer
    clearTimeout(timer);
    this.devArray[this.find(uid)].timer = this.setTimer(uid);
  },
  add: function (uid) {
    console.log("uid"+uid);
    
    if (this.find(uid) === -1) {  // Device not available
      device = {
        uid,
        timer: this.setTimer(uid)
      }
      this.devArray.push(device);
      this.emit();
    } else { // Device already availbale
      this.resetTimer(uid);
    }
  }
}

var io = socketIo(server);

io.on('connection', (socket) => {
  console.log("A new WebSocket connection has been established");
  socket1 = socket;
})

app.post("/remoteApp", function (req, res) {

  if (req.body.deviceId) {
    deviceId = req.body.deviceId;
  }
  if (req.body.added) {
    status = true;
    auth = req.body.added;
  }
  if (req.body.id) {
    temp = req.body.id;
  }

  if(status) 
  {
    if (temp == deviceId) 
    {
      res.send(auth);
    }
    else 
    {
      res.send("");
    }
  }
  else 
  {
    var uid = req.body.deviceId;
    dev.devices(uid, function (data) 
    {
      if (data.bookmark != 'nil') 
      {
        if (data.bookmark == undefined) 
        {
          res.send("");
          return;
        }
        else 
        {
          devicesObj.add(uid);
        }
      }
      else 
      {
        res.send("Not valid device");
        return;
      }
    });
  }
})

app.get("/initarray", function (req, res) {
  res.send(devicesObj.emit());
})

module.exports = app;