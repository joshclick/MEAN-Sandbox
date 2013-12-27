// load mongoose since we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text    : String,
    type    : { type: String, default: 'never' },
    created : { type: Date, default: Date.now },
    finished: Date,
    done    : { type: Boolean, default: false }
});