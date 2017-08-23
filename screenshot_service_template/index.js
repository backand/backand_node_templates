//const backand = require('@backand/nodejs-sdk');
const exec = require('child_process').exec;
const crypto = require('crypto');
const fs = require('fs');
const validUrl = require('valid-url');

// backand.init({
//     appName: 'APP_NAME',
//     anonymousToken: 'APP_ANONYMOUS_TOKEN'
// });

exports.backandCallback = function (parameters, userProfile, respondToBackand) {
  // README - Here is the starting point of your code.
  // Do not change the signature of backandCallback.
  // Do not exit anywhere from your code, meaning, do not use process.exit
  // Backand will take care of that for you
  // You should call the respondToBackand callback: function(err, data) { ... }

  //Make parameters.runBackandSDKDemo to true to run Backand CRUD demo.
  //To make the demo run, you need to un-comment backandCrudDemo method below.

  // overall constants
  const screenWidth = 1280;
  const screenHeight = 1024;
  const timeout = 30000;

  console.log(parameters);
  const targetUrl = parameters.query.url;

  // check if the given url is valid
  if (!validUrl.isUri(targetUrl)) {
    cb(`422, please provide a valid url, not: ${targetUrl}`);
    return false;
  }

  //const targetBucket = event.stageVariables.bucketName;
  const targetHash = crypto.createHash('md5').update(targetUrl).digest('hex');

  // build the cmd for phantom to render the url
  var cmd = null;
  if(process.platform == "darwin"){ //mac os
    cmd = `./phantomjs/phantomjs_osx --debug=no --ignore-ssl-errors=true ./phantomjs/screenshot.js ${targetUrl} /tmp/${targetHash}.png ${screenWidth} ${screenHeight} ${timeout}`;
  } else { 
    cmd = `./phantomjs/phantomjs_linux-x86_64 --debug=no --ignore-ssl-errors=true ./phantomjs/screenshot.js ${targetUrl} /tmp/${targetHash}.png ${screenWidth} ${screenHeight} ${timeout}`; // eslint-disable-line max-len
  }
  console.log(cmd);

  // run the phantomjs command
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      // the command failed (non-zero), fail the entire call
      console.warn(`exec error: ${error}`, stdout, stderr);
      respondToBackand(`422, please try again ${error}`,null);
    } else {
      // snapshotting succeeded, let's upload to S3
      // read the file into buffer (perhaps make this async?)
      const fileBuffer = fs.readFileSync(`/tmp/${targetHash}.png`);

      // convert binary data to base64 encoded string
      respondToBackand(null, {website: targetUrl, targetFile: `/tmp/${targetHash}.png`});
      
      //save directly to S3
      //const s3 = new AWS.S3();
      //const targetFilename = `${targetHash}/original.png`;
      // s3.putObject({
      //   ACL: 'public-read',
      //   Key: targetFilename,
      //   Body: fileBuffer,
      //   Bucket: targetBucket,
      //   ContentType: 'image/png',
      // }, (err) => {
      //   if (err) {
      //     console.warn(err);
      //     cb(err);
      //   } else {
      //     // console.info(stderr);
      //     // console.info(stdout);
      //     cb(null, {
      //       hash: targetHash,
      //       key: `${targetFilename}`,
      //       bucket: targetBucket,
      //       url: `${event.stageVariables.endpoint}${targetFilename}`,
      //     });
      //   }
      //   return;
      // });
    }
  });

};

