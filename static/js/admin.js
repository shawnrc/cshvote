/**
 * admin.js - Angular App for CSHVote.Admin
 * @author Shawn Chowdhury [shawnrc@csh.rit.edu]
 * @credits {{Your name here when you contribute}}
 *
 */

(function() {

    var VoteAdmin = angular.module('VoteAdmin', []);

    VoteAdmin.controller('CategoryAdmin', ['$http', function($http) {

        // to avoid scoping problems later
        catCtrl = this;
        // category display
        this.categories = [];
        // new category form object
        this.newCategory = {};

        this.getCategories = function() {
            $http.get('/api/categories')
                .success(function(data) {
                    catCtrl.categories = data;
                })
                .error(function(data) {
                    catCtrl.categories = [{
                        'catName': "error",
                        'prettyName': "Error getting categories."
                    }];
                });
        };

        this.addCategory = function(catList) {

            this.newCategory.catName = this.newCategory.prettyName.toLowerCase().split(' ').join('-');
            catList.push(this.newCategory);

            $http.post("/api/add_cat", {catName: this.newCategory.prettyName})
                .success(function(data) {
                    catCtrl.newCategory = {};
                })
                .error(function(data) {
                    catCtrl.getCategories();
                });

        };

        this.getCategories();

    }]);


})();
