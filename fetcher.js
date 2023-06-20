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

//require  fs
const fs = require('fs');

//retrieve command line arguments
const url = process.argv[2];
const filePath = process.argv[3];

//check if both URL & filepath provided
if (!url || !filePath) {
  console.error('Please provide both a URL and a file path.');
  process.exit(1);
}

//check if the url is valid

function isUrlValid(url) {
  const regex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return regex.test(url);
}

// usage

if (!isUrlValid(url)) {
  console.error('Invalid URL');
  process.exit(1);
}


// check if the file path is valid
function isPathValid(filePath) {
    try {
        fs.access(filePath);
        return true;
      } catch (error) {
        return false;
        }
}
    
// usage
if (!isPathValid(filePath)) {
    console.error('Invalid file path');
    process.exit(1);
}