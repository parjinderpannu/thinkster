var app = angular.module('flapperNews', []);

  app.controller('MainCtrl', ['$scope','posts', 
    function($scope, posts){
      $scope.test = 'Hello World!';
  // Post Variables
      $scope.posts = posts.posts;
  // Adding a addPost function
      $scope.addPost = function(){
        if(!$scope.title || $scope.title === '') { return; }
        $scope.posts.push({
          title: $scope.title,
          link: $scope.title,
          upvotes: 0
        });
        $scope.title = '';
        $scope.link = '';
      };
  // Adding a Increase upvote count func
      $scope.incrementUpvotes = function(post) {
        post.upvotes += 1;
      };

      app.factory('posts', [function(){
        var o = {
        posts: []
        };
        return o;
      }]);
  } 
]);
