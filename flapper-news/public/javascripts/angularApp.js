var app = angular.module('flapperNews', ['ui.router']);

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
          comments: [
            {author: 'Joe', body: 'Cool post!', upvotes: 0},
            {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
          ]
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

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
  $scope.post = posts.posts[$stateParams.id];
  $scope.addComment = function(){
    if($scope.body === '') { return; }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    });
    $scope.body = '';
  };
}]);

app.config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

          $stateProvider
            .state('home', {
              url: '/home',
              templateUrl: '/home.html',
              controller: 'MainCtrl'
            })
            .state('posts', {
              url: '/posts/{id}',
              templateUrl: '/posts.html',
              controller: 'PostsCtrl'
            });

          $urlRouterProvider.otherwise('home');
}]);
