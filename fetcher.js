// Page Downloader
// use previous knowledge of working with http & file systems
/* Implementation of node app - fetcher:-

 -takes two command line arguments:
  1. a URL
  2. a local file path

 - download the resource @URL to local /path/....
 - Upon completion :
    - should print "Downloaded and saved 1235 bytes to ./index.html"
 
  Async operations:
    - make http request & wait for the response
    - after request, take data received & write it to a file in path
    - use nested callbacks to control asynchronous operations
 */

//require request and fs
const request = require('request');
const fs = require('fs');
// const { constants } = fs;


//retrieve command line arguments
const url = process.argv[2];
const filePath = process.argv[3];

//check if both URL & filepath provided
if (!url || !filePath) {
  console.error('Please provide both a URL and a file path.');
  process.exit(1);
}

//check if the url is valid

const isUrlValid = function(url) {
  const regex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return regex.test(url);
};

// usage

if (!isUrlValid(url)) {
  console.error('Invalid URL');
  process.exit(1);
}


// check if the file path is valid
const isPathValid = function(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch (error) {
    return false;
  }
};
    
// usage
if (!isPathValid(filePath)) {
  console.error('Invalid file path');
  process.exit(1);
}

//use nested callbacks to control the asynchronous operations
// make http request
request(url, (error, response, body) => {
  // Print the error if one occurred during the HTTP request
  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }
  
  //
  fs.writeFile(filePath, body,(error) =>{
    //print if any errors during file writing
    if (error) {
      console.error("Failed to write to specified local path");
      process.exit(1);
    } else {
      //check if file already exists, then ask user to overwrite
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question('File already exists. Type Y to overwrite: ', (answer) => {
        if (answer === 'Y') {
          // Download the content and save the data
          console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
          rl.close();
        } else {
          console.log('Skipping download');
          rl.close();
        }
      });
      //If successful, print this message with length of the downloaded data and file path
      console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
    }
  });
});


