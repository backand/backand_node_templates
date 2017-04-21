// tests/part1/cart-summary-test.js
var chai = require('chai');
var sinon = require('sinon');
var backandCallback = require('../index.js').backandCallback;
var Trello = require('trello');
var client = null;


describe('backandCallback', function(){

  const API_KEY = '123abc'; // API Key for Trello
  const TOKEN='123abc'; // using a token to authenticate. There is also an authentication process.
  var expect = chai.expect; // we are using the "expect" style of Chai
  var trello;

  beforeEach(function () {
    trello = new Trello('key', 'token');
  });
  afterEach(function() {
    //exports.restore();
  });
  it("should include Trello for mocking",function(){
    expect(Trello).to.be
  });

  it("should use .addCard to add a card to the board", function() {

    var trello = new Trello(API_KEY, TOKEN);

    var trello_stub = sinon.spy(Trello.prototype, "addCard");

    backandCallback({},{name: 'foo', description: 'bar'},{},function(){});
    expect(trello_stub.calledOnce).to.be.true;
    Trello.prototype.addCard.restore();
  });

  it("should use the 'name' and 'description' fields from the params", function() {
    var functionParams = {
        name: "Test Card",
        description: "Test description"
    };
    sinon.spy(Trello.prototype, "addCard");
    backandCallback({},functionParams,{},function(){});
    var argName = Trello.prototype.addCard.getCall(0).args[0];
    var argDesc = Trello.prototype.addCard.getCall(0).args[1];
    expect(argName).to.equal(functionParams.name);
    expect(argDesc).to.equal(functionParams.description);
    Trello.prototype.addCard.restore();
  })

  it("should return an error message on failure", function() {
    sinon.spy(genericCallback)

    sinon.stub(Trello.prototype, "addCard", function(name, description, list, callbackFunction){
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

    backandCallback({},{name: 'foo', description:'bar'},{},genericCallback);
    expect(callbackCalled).to.equal(true);
    expect(err).to.equal("it broke");
  });

  it("returns an error if 'name' or 'description' are not present in the params", function() {
    var genericCallback = function(errorMsg, data){
      callbackCalled = true;
      messageId = data;
      err = errorMsg;
    };

    var callbackCalled = false;
    var messageId = null;
    var err = null;

    backandCallback({},{name: "foo"},{},genericCallback);
    expect(callbackCalled).to.be.true;
    expect(err.message).to.match(/description is missing/);

    var callbackCalled = false;
    var messageId = null;
    var err = null;

    backandCallback({},{description:"foo"},{},genericCallback);
    expect(callbackCalled).to.equal(true);
    expect(err.message).to.match(/name is missing/);
  });
});
