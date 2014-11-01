assert = require('assert')
allDone = require('../index')

var fired = false;
var complete = false;
var cb_maker = allDone(function() {
	assert(fired, "All Done callback was fired before the per-callback one.");
	complete = true;
});

cb_maker(function() {
	assert(!complete, "All Done callback was fired before the per-callback one.");
	fired = true;
})();

assert(complete, "All Done callback was not fired.")
assert(fired, "per-callback was not fired.")
