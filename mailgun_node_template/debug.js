var handler = require('./handler.js').handler;
var parameters = {
    "parameters": { from: 'kornatzky@me.com', to: 'kornatzky@gmail.com', subject: 'Greeting', message: 'hello' },
    "userProfile":{}
};

handler(parameters, {succeed:function(result){
    console.log("success: ", JSON.stringify(result, null, 2));
    process.exit(0);
}, fail:function(error){
    console.error("error: ", error);
    process.exit(1);
}});

