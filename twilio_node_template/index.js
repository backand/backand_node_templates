// This simple example sends a text message from the configured twilio account
// to the requested number. The message and the target address are both
// available in the "parameters" object, and are provided as arguments to the
// Backand custom action that will invoke this Lambda code.
//
// Basic Usage:
// backandCallback({},{to:'555-1212',message:'HELLO WORLD'},{},function(){});
var twilio = require('twilio');

exports.backandCallback = function(parameters, userProfile, respondToBackand) {
  var accountSid = 'YOUR_ACCOUNT_SID'; // Your Account SID from www.twilio.com/console
  var authToken = 'YOUR_AUTH_TOKEN';   // Your Auth Token from www.twilio.com/console

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
        from: 'YOUR_TWILIO_NUMBER' // From a valid Twilio number
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
