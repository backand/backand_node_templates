// var BackandSDK = require('backandsdk/backand');
// var backand = new BackandSDK();

const API_KEY = '2991eb0423eb7ac2b95de4f1822f7ce8'; // API Key for Trello
const TOKEN='961abe46ee877a5789627e4569b84b7632717cef815d62302843dc2f437edaf8'; // using a token to authenticate. There is also an authentication process.
//const MEMBER_ID='mattbillock1'; // username in trello
//const BOARD_ID='EcYLC81f'; // from URL - can also be obtained from the API
//const ORG_ID = 'releaseteam11';
const LIST_ID = '587ebaa0f10cbc38ba80b95e';
var Trello = require('trello');

exports.backandCallback = function(dbRow, parameters, userProfile, respondToBackand) {
  console.log("HERE WE GO BUCKO");

  var trello = new Trello(API_KEY, TOKEN);
  trello.addCard(parameters.name,parameters.description,LIST_ID, function(error,response){
    pry = require('pryjs')
eval(pry.it)
    if (error) {
      console.log('Could not add card:', error);
    }
    else {
      console.log('Added card:', response);
    }
  });
}
