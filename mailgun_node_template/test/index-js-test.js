var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var _ = require('lodash');
var jsonfile = require('jsonfile')
var async = require('async');



// The subject under tests for our purposes is backandCallback:
var backandCallback = require('../index.js').backandCallback;


describe('backandCallback', function(done){
  let api_key = 'key-7ige0080ltlgm8o20cg94fy5uczxpwj9'; //'MAILGUN-API-KEY';
  let domain = 'sandboxde997a2fb44a45ee81e6ac2ba2f8065f.mailgun.org'; // 'YOUR-DOMAIN.com'; 
  let testConfig = {
    api_key: api_key, 
    domain: domain
  };

  let config = null;
  
  
  let functionParams = { 
    from: 'kornatzky@me.com', 
    to: 'kornatzky@gmail.com', 
    subject: 'Greeting', 
    message: 'hello' 
  };

  

  before(function(done) {    
    async.series([
        function(callback) {
          jsonfile.readFile('./config.json', function(err, data){
            if (!err){
              config = data;
            }
            callback(err, data)
          });
        },
        function(callback){
            jsonfile.writeFile('./config.json', testConfig, function(err){
              callback(err);
            });
        }
    ], 
    function(err, results) {
      done();
    });

  });

  it("should return an OK message when the call succeeds", function(done) {
    this.timeout(32000);
    backandCallback(functionParams,{},function(err, data){
      expect(data.message).to.equal("Queued. Thank you.");
      done();
    });
  });
 
  it("should use the 'from' field from the params", function(done) {
    this.timeout(32000);
    backandCallback(_.omit(functionParams, ['from']),{},function(err, data){
      expect(err.message).to.match(/from is missing/);
      done();
    });    
  });

  it("should use the 'to' field from the params", function(done) {
    this.timeout(32000);
    backandCallback(_.omit(functionParams, ['to']),{},function(err, data){
      expect(err.message).to.match(/to is missing/);
      done();      
    });
  });

  it("should use the 'subject' field from the params", function(done) {
    this.timeout(32000);
    backandCallback(_.omit(functionParams, ['subject']),{},function(err, data){
      expect(err.message).to.match(/subject is missing/);
      done();
    });
  });

  it("should use the 'message' field from the params", function(done) {
    this.timeout(32000);
    backandCallback(_.omit(functionParams, ['message']),{},function(err, data){
      expect(err.message).to.match(/message is missing/);    
      done();
    });
  });

  after(function(done) {
    jsonfile.writeFile('./config.json', config, function(err){
      done();      
    });
  });
});
