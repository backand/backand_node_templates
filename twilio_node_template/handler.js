var backandCallback = require('./index.js').backandCallback;

exports.handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    try {
        backandCallback(event.parameters, event.userProfile, function (error, result) {
            if (error)
            {
                context.fail(typeof error === 'object' ? JSON.stringify(error, null, 2) : error);
            }
            else{
                context.succeed(result);
            }
        })
    }
    catch(error){
        context.fail("unhandled: " + error);

    }
};

