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