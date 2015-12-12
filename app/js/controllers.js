'use strict';

/* Controllers */

angular.module('JobFeedApplication')
.controller('FeedListCtrl', ['$scope', 'Feed',
    function ($scope, Feed) {
        Feed.get({}, function(data) {
            $scope.feeds = data;
            $scope.orderProp = 'age';
        });
    }])
.controller('FeedDetailCtrl', ['$scope', '$routeParams', 'Feed',
    function ($scope, $routeParams, Feed) {
        Feed.get({id: $routeParams.id}, function (data) {
            $scope.feed = data.feed.entry[0];
        });
    }]);