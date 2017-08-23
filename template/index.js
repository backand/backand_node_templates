// const backand = require('@backand/nodejs-sdk');
// backand.init({
//     appName: '<your app name>',
//     anonymousToken: '<app anonymous token>'
// });

exports.backandCallback = function (parameters, userProfile, respondToBackand) {
  // README - Here is the starting point of your code.
  // Do not change the signature of backandCallback.
  // Do not exit anywhere from your code, meaning, do not use process.exit
  // Backand will take care of that for you
  // You should call the respondToBackand callback: function(err, data) { ... }

  //Make parameters.runBackandSDKDemo to true to run Backand CRUD demo.
  //To make the demo run, you need to un-comment backandCrudDemo method below.

  var runBackandSDKDemo = false;
  if(parameters && parameters.runBackandSDKDemo){
    runBackandSDKDemo = parameters.runBackandSDKDemo;
  }

  // Bellow is an example of how to handle success and failure of your code
  if(!runBackandSDKDemo){
    // a response data example
    var helloWorld = {"message": "Hello World!"};

    if(helloWorld){
      // success handling
      respondToBackand(null, helloWorld);
    } else {
      // error handling
      respondToBackand({errorMessage: "An error occurred"}, null);
    }

  } else {
    //example calling backand SDK with promise
    backandCrudDemo().then(function (response) {
      /* response to exist the action */
        console.log("remove", response);
        respondToBackand(null, {result: response.data})
    });

  }

};

// To run a demo of how to perform CRUD (Create, Read, Update and Delete) with Backand SDK, do the following:
// 1. npm install backandsdk --save
// 2. Change runBackandSDKDemo to true
// 3. Uncomment the function backandCrudDemo and the two first variables BackandSDK and backand
// 4. Uncomment the call for the function backandCrudDemo

// function backandCrudDemo(){
//     var id;
//     return backand.object.getList('items')
//         .then(function(response){
//             console.log("get a list", response);
//             return backand.object.create('items', {"name":"create example"})
//         }).then(function(response){
//             console.log("create", response);
//             id = response.data.__metadata.id;
//             return backand.object.update('items', id, {"name":"update example"})
//         }).then(function(response){
//             console.log("update", response);
//             return backand.object.getOne('items', id)
//         }).then(function(response){
//             console.log("get one", response);
//             return backand.object.remove('items', id)
//         });
// }

