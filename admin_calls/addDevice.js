var request = require("request");

exports.addDevice=function(id,classname,description,callback)
{
  console.log(id+" "+classname+' '+description);
	var result;
	var options = { method: 'POST',
  url: 'https://tgacg8.internetofthings.ibmcloud.com/api/v0002/device/types/iotbootcamp/devices',
  headers: 
   { 'Postman-Token': '8bd972f8-1170-466a-a931-ee93601a6213',
     'Cache-Control': 'no-cache',
     Authorization: 'Basic YS10Z2FjZzgtcDNoZXlmMWMxZzpvRm1jZ1RlaUNCd0BRNCp2aig=',
     'Content-Type': 'application/json' },
  body: 
   { deviceId: id,
     deviceInfo: 
      { serialNumber: '100087',
        manufacturer: 'ACME Co.',
        model: '7865',
        deviceClass: classname,
        description: description,
        fwVersion: '1.0.0',
        hwVersion: '1.0',
        descriptiveLocation: 'Office 5, D Block' } },
  json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    else 
    console.log(response.body);

    callback(response.body); 
	});
}