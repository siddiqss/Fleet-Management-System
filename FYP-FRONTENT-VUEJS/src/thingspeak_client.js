const https = require('https');

/*
Read data from whole feed
https://api.thingspeak.com/channels/1443892/feeds.json?api_key=UH6F84XDQDXV8JA8

Read data from a field
https://api.thingspeak.com/channels/1443892/fields/1/last.json?api_key=UH6F84XDQDXV8JA8
*/

var all_data, longitude, latitude, speed, mileage;
https.get('https://api.thingspeak.com/channels/1443892/feeds.json?api_key=UH6F84XDQDXV8JA8',
 (resp) => {
  let data = '';
  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    all_data = JSON.parse(data);
    longitude = all_data["feeds"].slice(-1)[0]["field1"];
    latitude = all_data["feeds"].slice(-1)[0]["field2"];
    speed = all_data["feeds"].slice(-1)[0]["field3"];
    mileage = all_data["feeds"].slice(-1)[0]["field4"];
    console.log(longitude);
    console.log(latitude);

  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});