var cfenv = require("cfenv");
var request = require("request");


exports.devices = function (dev, callback) {
  var request = require("request");

  var options = {
    method: 'POST',
    url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/devices/_find',
    headers:
      {
        'postman-token': 'ac0dc8b4-9e95-94ea-fd20-9e4a3ac73fd7',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw=='
      },
    body:
      {
        selector: { _id: dev },
        fields: ['_id', '_rev'],
        sort: [{ _id: 'asc' }]
      },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    //console.log(body);
    // console.log(body.bookmark);
    callback(body);
  });

}