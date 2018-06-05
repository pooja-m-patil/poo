var request = require("request");

exports.getIOTDevice=function(callback)
{
  var request = require("request");

  var options = { method: 'GET',
  url: 'https://tgacg8.internetofthings.ibmcloud.com/api/v0002/device/types/iotbootcamp/devices',
  headers: 
   { 'postman-token': '87229583-b621-8b11-cd53-4aa499a36e5f',
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     authorization: 'Basic YS10Z2FjZzgtcDNoZXlmMWMxZzpvRm1jZ1RlaUNCd0BRNCp2aig=' } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
      console.log(body);
      console.log(JSON.parse(body));
      body=JSON.parse(body);
      callback(body);
  });
}