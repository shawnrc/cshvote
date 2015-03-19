/**
 * app.js - AngularJS Application Logic for CSHVote
 * @author: Shawn Chowdhury [shawnrc@csh.rit.edu]
 * @credits: {{Your name here when you contribute}}
 *
 */

(function() {
    // Instantiate our ng-app
    var CSHVote = angular.module('CSHVote', ['ngRoute'])
        .config(function($routeProvider, $locationProvider) {

            $locationProvider.html5Mode(true);

        });


    // Declare and build our controllers


    CSHVote.controller('CategoriesController', ['$http', '$location', function($http, $location) {

        // instantiate to empty, so the list doesn't bug out
        var catCtrl = this;
        catCtrl.categories = [];

        // call out to the categories endpoint
        $http.get('/api/categories')
            .success(function(data) {
                catCtrl.categories = data;
                catCtrl.categories.splice(0, 0, {catName: "All"})
            })
            .error(function(data) {
                catCtrl.categories = ["Error getting categories."];
            });

    }]);
})();
