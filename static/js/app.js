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

    /**
     * CategoriesController - Controller for our categories...
     */
    CSHVote.controller('CategoriesController', ['$http', '$location', function($http, $location) {

        // avoid scoping issues
        var catCtrl = this;

        // instantiate to empty, so the list doesn't bug out
        catCtrl.categories = [];


        /**
         * isSet - determines if a category is currently selected
         * @param route - the route you want to check
         * @returns {boolean}
         */
        catCtrl.isSet = function(route) {
          return route === $location.path();
        };


        // call out to the categories endpoint
        $http.get('/api/categories')
            .success(function(data) {
                catCtrl.categories = data;
                catCtrl.categories.splice(0, 0, {
                    catName: "all",
                    prettyName: "All"
                })
            })
            .error(function(data) {
                catCtrl.categories = ["Error getting categories."];
            });

    }]);
})();
