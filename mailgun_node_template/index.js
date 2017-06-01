// This simple example sends a html email message from the configured mailgun account
// to the requested address. The message and the target address are both
// available in the "parameters" object, and are provided as arguments to the
// Backand custom action that will invoke this Lambda code.
//
// Basic Usage:
// backandCallback({},{ from:  'jane.doe@backand.io', to:'john.doe@backand.io', subject: 'Greetings', message:'HELLO WORLD' },{},function(){});


exports.backandCallback = function(parameters, userProfile, respondToBackand) {

  var config = require('jsonfile').readFileSync('./config.json');

  //Your api key, from Mailgun Control Panel
  var api_key = config.api_key; //'key-7ige0080ltlgm8o20cg94fy5uczxpwj9'; //'MAILGUN-API-KEY';

  //Your domain, from the Mailgun Control Panel
  var domain = config.domain; // 'sandboxde997a2fb44a45ee81e6ac2ba2f8065f.mailgun.org'; // 'YOUR-DOMAIN.com';


  var Mailgun = require('mailgun-js');

  //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
  var mailgun = new Mailgun({apiKey: api_key, domain: domain});
  if(!parameters.to) {
    var errors = {message: "to is missing"};
    respondToBackand(errors, null);
  }
  else if(!parameters.from) {
    var errors = {message: "from is missing"};
    respondToBackand(errors, null);
  }
  else if(!parameters.subject) {
    var errors = {message: "subject is missing"};
    respondToBackand(errors, null);
  }
  else if(!parameters.message) {
    var errors = {message: "message is missing"};
    respondToBackand(errors, null);
  }
  else {
    var data = {
      //Specify email data
      from: parameters.from,
      //The email to contact
      to: parameters.to,
      //Subject and text data  
      subject: parameters.subject,
      html: parameters.message
    }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
      if(err) {
        respondToBackand(err, body);
      }
      else {
        respondToBackand(null, body);
      }
    });
  } 

}
