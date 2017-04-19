// tests/part1/cart-summary-test.js
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect; // we are using the "expect" style of Chai
var backandCallback = require('../index.js').backandCallback;
var twilio = require('twilio');
var client = null;


describe('backandCallback', function(){
  let functionParams;
  beforeEach(function() {
    var accountSid = 'AC818530b828295a02fcb3c00c38774178'; // Your Account SID from www.twilio.com/console
    var authToken = '46a1e804c9990772c4eba645fce4365e';   // Your Auth Token from www.twilio.com/console
    client = new twilio.RestClient(accountSid, authToken);
    var spy = sinon.stub(twilio, "RestClient", function(accountSid, authToken) {
      return client;
    });
    functionParams = {
        to: "+1234567890",
        message: "HELLO WORLD"
    };
  });
  afterEach(function() {
    twilio.RestClient.restore();
  });
  it("should include twilio for mocking",function(){
    expect(twilio).to.be
  });

  it("should create a new Twilio RestClient object", function() {
    backandCallback({},{},{},function(){});
    expect(twilio.RestClient.calledOnce).to.equal(true);
  });

  it("should use twilio.message.create to send a message", function() {
    sinon.spy(client.messages, "create");
    backandCallback({},functionParams,{},function(){});
    expect(client.messages.create.calledOnce).to.equal(true);
    client.messages.create.restore();
  });

  it("should use the 'to' field from the params", function() {
    var functionParams = {
        to: "+1234567890",
        message: "HELLO WORLD"
    };
    sinon.spy(client.messages, "create");
    backandCallback({},functionParams,{},function(){});
    var argsHash = client.messages.create.getCall(0).args[0];
    expect(argsHash.to).to.equal(functionParams.to);
  });

  it("should use the 'body' field from the params", function() {
    var functionParams = {
        to: "+1234567890",
        message: "HELLO WORLD"
    };
    sinon.spy(client.messages, "create");
    backandCallback({},functionParams,{},function(){});
    var argsHash = client.messages.create.getCall(0).args[0];
    expect(argsHash.body).to.equal(functionParams.message);
  })

  it("should return the message ID when the call succeeds", function() {
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

  it("should return an error message on failure", function() {
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

  it("returns an error if 'to' or 'message' are not present in the params", function() {
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
