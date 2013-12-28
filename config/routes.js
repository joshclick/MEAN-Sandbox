// load the todo model
var Todo = require('../app/models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {
    // -------- API -------- 
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    app.post('/api/todos/fin/:todo_id', function(req, res) {
        Todo.findByIdAndUpdate(req.params.todo_id,
            {
                type : 'done',
                finished: new Date()
            }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        })
    });

    app.delete('/api/todos/del/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    app.get('/', function(req, res) { res.render('index'); });
    app.get('/todo', function(req, res) { res.render('todo'); });
    app.get('/weebly', function(req, res) { res.render('weebly'); });
};