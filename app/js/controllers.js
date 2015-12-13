'use strict';

/* Controllers */

angular.module('JobFeedApplication')
.controller('FeedListCtrl', ['$scope', '$root', '$window', 'Feed',
    function ($scope, $root, $window, Feed) {
        //$scope.types = mmUtilities.types;
        Feed.get({}, function(data) {
            $scope.feeds = data;
        });

        $scope.timer = 0;
        $scope.orderProp = 'title';

        $root.currItemIndex = 0;

        $scope.$watch('sorter', function(){
            $window.clearTimeout($scope.timer);
            $scope.timer = $window.setTimeout(rearrange, 100);
        });

        function rearrange() {
            $('.item').each(function (idx, el) {
                var $el = $(el);
                var newTop = idx * $config.OFFSET_Y;

                if (newTop != parseInt($el.css('top'))) {
                    $el.css({
                            'top': newTop
                        })
                        .one('webkitTransitionEnd', function (evt) {
                            $(evt.target).removeClass('moving');
                        })
                        .addClass('moving');
                }

            });
        }

    }])
.controller('FeedDetailCtrl', ['$scope', '$location', '$routeParams', 'Feed',
    function ($scope, $location, $routeParams, Feed) {
        $scope.types = mmUtilities.types;
        if (!isNaN($routeParams.id)) {
            Feed.get({id: $routeParams.id}, function (data) {
                if ($scope.types.isJSON(data.feed.entry[0])) {
                    $scope.feed = data.feed.entry[0];
                } else {
                    $location.path("/404");
                }
            });
        } else {
            $location.path("/jobs");
        }
    }]);