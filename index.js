module.export = function all_done(callback_fn) {
    var queue_count = 0;
    var locked = false;

    var make_callback = function (wrapped_callback) {
        queue_count++;
        console.log("Creating callback. Have ", queue_count, " pending");
        return function () {
            if (wrapped_callback)
                wrapped_callback.apply(this, arguments);
            queue_count--;
            if (!locked && queue_count <= 0) {
                callback_fn();
            }
        };
    };

    make_callback.lock = function () {
        locked = true;
        return this;
    };
    make_callback.unlock = function () {
        if (locked && queue_count <= 0) {
            // This prevents unlock from calling the callback if we weren't locked.
            callback_fn();
        }
        locked = false;
        return this;
    };

    return make_callback;
};
