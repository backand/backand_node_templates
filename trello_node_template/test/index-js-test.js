// tests/part1/cart-summary-test.js
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect; // we are using the "expect" style of Chai
var backandCallback = require('../index.js').backandCallback;
var Trello = require('trello');
var client = null;


describe('backandCallback', function(){
  let functionParams;
  const API_KEY = '2991eb0423eb7ac2b95de4f1822f7ce8'; // API Key for Trello
  const TOKEN='961abe46ee877a5789627e4569b84b7632717cef815d62302843dc2f437edaf8'; // using a token to authenticate. There is also an authentication process.
  const LIST_ID = '587ebaa0f10cbc38ba80b95e';
  beforeEach(function() {
    //trello = new Trello(API_KEY, TOKEN);
    //var spy = sinon.stub(exports, "Trello").returns(trello);//, function(API_KEY, TOKEN) {
      //return client;
    //});
    functionParams = {
        name: "+1234567890",
        description: "HELLO WORLD"
    };
  });
  afterEach(function() {
    //exports.restore();
  });
  it("should include Trello for mocking",function(){
    expect(Trello).to.be
  });

  it("should use .addCard to add a card to the board", function() {
    var trello = new Trello(API_KEY, TOKEN);
    var trello_stub = sinon.spy(trello, "addCard");
    var spy = sinon.stub(exports, "Trello").returns(trello);

    backandCallback({},functionParams,{},function(){});
    expect(trello_stub).to.have.been.called();
    //trello.addCard.restore();
  });

  xit("should use the 'to' field from the params", function() {

    expect(argsHash.to).to.equal(functionParams.to);
  });

  xit("should use the 'body' field from the params", function() {
    var functionParams = {
        to: "+1234567890",
        message: "HELLO WORLD"
    };
    sinon.spy(client.messages, "create");
    backandCallback({},functionParams,{},function(){});
    var argsHash = client.messages.create.getCall(0).args[0];
    expect(argsHash.body).to.equal(functionParams.message);
  })

  xit("should return the message ID when the call succeeds", function() {
    sinon.spy(genericCallback)

    sinon.stub(client.messages, "create", function(args, callbackFunction){
      callbackFunction(null,{sid:"123abc"});
    });

    var genericCallback = function(errorMsg, data){
      callbackCalled = true;
      messageId = data;
      err = errorMsg;
    };

    var callbackCalled = false;
    var messageId = null;
    var err = null;

    backandCallback({},functionParams,{},genericCallback);
    expect(callbackCalled).to.equal(true);
    expect(messageId.sid).to.equal("123abc");
  });

  xit("should return an error message on failure", function() {
    sinon.spy(genericCallback)

    sinon.stub(client.messages, "create", function(args, callbackFunction){
      callbackFunction("it broke",{sid:"123abc"});
    });

    var genericCallback = function(errorMsg, data){
      callbackCalled = true;
      messageId = data;
      err = errorMsg;
    };

    var callbackCalled = false;
    var messageId = null;
    var err = null;

    backandCallback({},functionParams,{},genericCallback);
    expect(callbackCalled).to.equal(true);
    expect(err).to.equal("it broke");
  });

  xit("returns an error if 'to' or 'message' are not present in the params", function() {
    var genericCallback = function(errorMsg, data){
      callbackCalled = true;
      messageId = data;
      err = errorMsg;
    };

    var callbackCalled = false;
    var messageId = null;
    var err = null;

    backandCallback({},{message: "foo"},{},genericCallback);
    expect(callbackCalled).to.equal(true);
    expect(err.message).to.match(/to is missing/);

    var callbackCalled = false;
    var messageId = null;
    var err = null;

    backandCallback({},{to:"foo"},{},genericCallback);
    expect(callbackCalled).to.equal(true);
    expect(err.message).to.match(/message is missing/);
  });
});
