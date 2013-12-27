angular.module('todoController', [])
    
    // inject the Todo service factory into our controller
    .controller('mainController', function($scope, $http, Todos) {
        $scope.formData = {};

        // when landing on the page, get all todos and show them
        Todos.get()
            .success(function(data) {
                $scope.todos = data;
            });

        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
            if (!$.isEmptyObject($scope.formData)) {
                Todos.create($scope.formData)
                    .success(function(data) {
                        $scope.formData = {}; // clear form
                        $scope.todos = data;
                    });
            }
        };

        $scope.finishTodo = function(id) {
            Todos.finish(id)
                .success(function(data) {
                    $scope.todos = data;
                })
        };

        $scope.deleteTodo = function(id) {
            Todos.delete(id)
                .success(function(data) {
                    $scope.todos = data;
                });
        };

    });