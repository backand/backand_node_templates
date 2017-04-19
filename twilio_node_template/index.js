// var BackandSDK = require('backandsdk/backand');
// var backand = new BackandSDK();
var twilio = require('twilio');

exports.backandCallback = function(dbRow, parameters, userProfile, respondToBackand) {
  var accountSid = 'AC818530b828295a02fcb3c00c38774178'; // Your Account SID from www.twilio.com/console
  var authToken = '46a1e804c9990772c4eba645fce4365e';   // Your Auth Token from www.twilio.com/console

  var twilio = require('twilio');
  var client = new twilio.RestClient(accountSid, authToken);
  if(!parameters.to) {
    var errors = {message: "to is missing"};
    respondToBackand(errors, null);
  }
  else if(!parameters.message) {
    var errors = {message: "message is missing"};
    respondToBackand(errors, null);
  }
  else {
    client.messages.create({
        body: parameters.message,
        to: parameters.to,  // Text this number
        from: '+12248033457' // From a valid Twilio number
    }, function(err, message) {
        if(err)
        {
          console.error(err);
          respondToBackand(err, message);
        }
        else
        {
          console.log(message.sid);
          respondToBackand(null, message);
        }
    });
  }
}
