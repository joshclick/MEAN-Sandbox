angular.module('todoService', [])
    // each function returns a promise object 
    .factory('Todos', function($http) {
        return {
            get : function() {
                return $http.get('/api/todos');
            },
            create : function(todoData) {
                return $http.post('/api/todos', todoData);
            },
            finish : function(id) {
                return $http.post('/api/todos/fin/' + id);
            },
            delete : function(id) {
                return $http.delete('/api/todos/del/' + id);
            }
        }
    });