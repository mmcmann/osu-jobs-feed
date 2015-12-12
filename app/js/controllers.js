'use strict';

/* Controllers */

angular.module('JobFeedApplication')
.controller('FeedListCtrl', ['$scope', 'Feed',
    function ($scope, Feed) {
        var setData = function(data) {
            $scope.feeds = data;
            $scope.orderProp = 'age';
        };
        Feed.get(setData);
    }])
.controller('FeedDetailCtrl', ['$scope', '$routeParams', 'Feed',
    function ($scope, $routeParams, Feed) {
        $scope.feed = Feed.get({feedId: $routeParams.feedId}, function (feed) {
            $scope.mainImageUrl = feed.images[0];
        });

        $scope.setImage = function (imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
    }]);