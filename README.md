all-done
========

A simple node package that supports firing a callback once all other callbacks are completed.

Installation
------------

Simply install using npm.

    $ npm install all-done


Usage
-----

###Basic usage

```javascript
some_function = function(callback) {
  // ...
}

allDone = require('all-done')

completion_callback = function() {
  // Do something once everything is complete
}

callback_maker = allDone(completion_callback)

optional_individual_callback = function() {
  // ...
}

some_function(callback_maker(optional_individual_callback));
```

Note that any arguments that are passed from the `some_function` call to it's 
 callback will be forwarded(including the `this` context) to the `optional_individual_callback`.

Caveats
-------

In the example below, it is possible for the `completion_callback` to be fired multiple times. The library does not prevent nor protect from this.

```javascript

allDone = require('all-done')

completion_callback = function() {
  console.log("Done")
}

callback_maker = allDone(completion_callback)

setTimeout(50, callback_maker(function() {console.log("Callback 1")}))
setTimeout(100, function() {
  setTimeout(50, callback_maker(function() {console.log("Callback 2")}))
})
```
The above will output the following:
```plain
Callback 1
Done
Callback 2
Done
```
