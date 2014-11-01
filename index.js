
module.export = function all(callback_fn) {
    var queueCount = 0;
    var locked = false;

    var makeCallback = function (wrapped_callback) {
        queueCount++;
        return function () {
            if (wrapped_callback)
                wrapped_callback.apply(this, arguments);
            queueCount--;
            if (!locked && queueCount <= 0) {
                callback_fn();
            }
        };
    };

    makeCallback.lock = function () {
        locked = true;
        return this;
    };
    makeCallback.unlock = function () {
        locked = false;
        if (queueCount <= 0) {
            console.log("All done");
            callback_fn();
        }
        return this;
    };

    return makeCallback;
};
