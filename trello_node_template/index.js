// var BackandSDK = require('backandsdk/backand');
// var backand = new BackandSDK();

const API_KEY = 'TRELLO_API_KEY'; // API Key for Trello
const TOKEN='TRELLO_TOKEN'; // using a token to authenticate. There is also an authentication process.
const LIST_ID = 'TRELLO_LIST_ID';
var Trello = require('trello');

exports.backandCallback = function(parameters, userProfile, respondToBackand) {
  if(!parameters.name) {
    var errors = {message: "name is missing"};
    respondToBackand(errors, null);
  }
  else if(!parameters.description) {
    var errors = {message: "description is missing"};
    respondToBackand(errors, null);
  }
  else {
    var trello = new Trello(API_KEY, TOKEN);
    trello.addCard(parameters.name,parameters.description,LIST_ID, function(error,response){
      if (error) {
        console.log('Could not add card:', error);
        respondToBackand(error, response);
      }
      else {
        console.log('Added card:', response);
        respondToBackand(error, response);
      }
    });
  }

}
