// load mongoose since we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text    : String,
    type    : { type: String, default: 'now' },
    created : { type: Date, default: Date.now },
    finished: Date
});