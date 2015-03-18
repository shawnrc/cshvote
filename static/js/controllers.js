/**
 * controllers.js - AngularJS Controllers for CSHVote
 * @author: Shawn Chowdhury [shawnrc@csh.rit.edu]
 * @credits: {{Your name here when you contribute}}
 *
 */

// Instantiate our ng-app
(function() {
    var CSHVote = angular.module('CSHVote', []);


    // Declare and build our controllers
    CSHVote.controller('CategoriesController', function ($scope) {

        $scope.categories = $.ajax({
            url: ""


        });

    });
})();
