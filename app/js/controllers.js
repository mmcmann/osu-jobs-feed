'use strict';

/* Controllers */

angular.module('JobFeedApplication')
.controller('FeedListCtrl', ['$scope', '$rootScope', '$window', 'config', 'Feed',
    function ($scope, $root, $window, $config, Feed) {

        $scope.filters = {};
        $scope.timer = 0;

        $root.currItemIndex = 0;

        $scope.setFilter = function(str) {
            // How can I pass this value to FeedListItemCtrl?
            $scope.search = str;
            if ($config.DEBUG) console.log(str);
        };

        $scope.tab = function(tabIndex) {
            // Sort by date
            if (tabIndex == 1) {
                $scope.orderProp = 'date';
            }
            // Sort by title
            if (tabIndex == 2) {
                $scope.orderProp = 'title';
            }
            // Sort by department
            if (tabIndex == 3) {
                $scope.orderProp = 'author.name';
            }
        };

        $scope.sort = function(item) {
            if ($scope.orderProp == 'date') {
                return new Date(item.date);
            }
            return item[$scope.orderProp];
        };

        //$scope.$watch('sorter', function() {
        //    //console.log("sorter");
        //    $window.clearTimeout($scope.timer);
        //    $scope.timer = $window.setTimeout(rearrange, 100);
        //});

        //$scope.$watch($scope.filters, function() {
        //    console.log($scope.filters);
        //    $window.clearTimeout($scope.timer);
        //    $scope.timer = $window.setTimeout(rearrange, 100);
        //});

        $scope.rearrange = function() {
            $('.job-listing').each(function (idx, el) {
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
        };

    }])
.controller('FeedListTabCtrl', ['$scope',
    function($scope) {
        $scope.orderProp = 'date';
    }])
.controller('FeedListItemCtrl', ['$scope', '$rootScope', 'config', 'Feed',
    function($scope, $root, $config, Feed) {
        Feed.get({}, function(data) {
            $scope.feeds = data;
        });

        // Update this value dynamically - onclick
        $scope.filters = "";

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
    }])
.controller('jdController', ['$element', '$rootScope', 'config',
    function($el, $root, $config) {
        $el.css({ 'top': $root.currItemIndex * $config.OFFSET_Y });
        $root.currItemIndex++;
    }]);