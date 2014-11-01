all_done = require('../index.js');

function long_running_io(file_name, callback) {
  // Call the callback with the file_name in some time.
  setTimeout(callback, 1000 * (1 + Math.random()), file_name);
}

// Create a callback maker and lock the event.
var callback_maker = all_done(function() {
  // Once all the IO is completed.
  console.log("All the IO is done.");
}).lock();

for(var i=0;i<5;i++) {
  long_running_io("File " + i, callback_maker(function(file_name) {
    console.log("Finished reading from file: ", file_name);
  }));
}

/*
 * The following timeout simulates waiting for an event which will ensure that some callbacks have 
 *  started.
 */
setTimeout(function() {
  callback_maker.unlock();
}, 1500);




