'use strict';

/* Controllers */

angular.module('JobFeedApplication')
    .controller('FeedListCtrl', ['$scope', '$rootScope', '$window', '$filter', 'config', 'Feed', 'Departments', 'Titles',
        function ($scope, $root, $window, $filter, $config, Feed, Departments, Titles) {

            Feed.get({}, function (data) {
                $scope.feeds = $scope.feedsOrig = data; // possible_items
            });

            $scope.selection = {};
            $scope.selections = {};
            $scope.selectFilter = {};
            $scope.selectionTypes = [
                {name: 'departments', tip: 'Choose a department'},
                {name: 'titles', tip: 'Choose a title'}
            ]; //variation_dimensions
            Departments.get({}, function (results) {
                //$scope.departments = results;
                $scope.selections[$scope.selectionTypes[0].name] = results; // variation_values
                //    repeatSelect: null,
                //    availableOptions: results
                //};
            });

            Titles.get({}, function (results) {
                $scope.selections[$scope.selectionTypes[1].name] = results; // variation_values
            });

            $scope.sortType     = 'date'; // set the default sort type
            $scope.sortReverse  = true;  // set the default sort order
            $scope.query   = '';     // set the default search/filter term

            $scope.filters = {};
            $scope.timer = 0;

            $root.currItemIndex = 0;

            $scope.clearFilter = function () {
                $scope.query = {};
                $scope.selection = {};
                Feed.get({}, function (data) {
                    $scope.feeds = data; // possible_items
                });
            };

            $scope.updateFilter = function (sectionTypeName) {
                $scope.feeds = $scope.feedsOrig;
                //console.log("hi");
                for (var i = 0; i < $scope.selectionTypes.length; i++) {
                    //console.log($scope.selectionTypes[i].name);
                    console.log(sectionTypeName);
                    if ($scope.selectionTypes[i].name != sectionTypeName) {
                        //$scope.selection[sectionTypeName] = {};
                    }
                }
                var filteredData = $filter('filterSelection')(
                    sectionTypeName,
                    $scope.feeds.feed.entry,
                    $scope.selection
                );
                //console.log("origData");
                //console.log($scope.feeds);
                //console.log("filteredData");
                //console.log(filteredData);
                $scope.feeds = filteredData;
                //$filter
                //$scope.query = {};
                //$scope.selection = {};
                //$scope.feeds
            };

            $scope.setFilter = function (str) {
                //Feed.get({'//author/name': str}, function (data) {
                //    $scope.feeds = data;
                //});
                //$scope.query = {};
                $scope.query.title = str;
                //if ($config.DEBUG) console.log(str);
                //$('#repeatSelect option[value="' + str + '"]').prop('selected', true);
            };

            $scope.tab = function (tabIndex) {
                // Sort by date
                if (tabIndex == 1) {
                    $scope.sortType = 'date';
                }
                // Sort by title
                if (tabIndex == 2) {
                    $scope.sortType = 'title';
                }
                // Sort by department
                if (tabIndex == 3) {
                    $scope.sortType = 'author.name';
                }
                $scope.sortReverse = !$scope.sortReverse;
            };

            $scope.sort = function (item) {
                if ($scope.sortType == 'date') {
                    return new Date(item.published);
                }
                if ($scope.sortType == 'author.name') {
                    return item.author.name;
                }
                return item[$scope.sortType];
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

            $scope.rearrange = function () {
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
    //.controller('FeedListDeptCtrl', ['$scope', 'Departments', function($scope, Departments) {
    //    Departments.get({}, function (results) {
    //        //$scope.departments = results;
    //        $scope.data = {
    //            repeatSelect: null,
    //            availableOptions: results
    //        };
    //    });
    //}])
    //.controller('FeedListTabCtrl', ['$scope',
    //    function ($scope) {
    //        $scope.sortType = 'date';
    //    }])
    .controller('FeedListItemCtrl', ['$scope', '$rootScope', 'config', 'Feed',
        function ($scope, $root, $config, Feed) {
            Feed.get({}, function (data) {
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
        function ($el, $root, $config) {
            $el.css({'top': $root.currItemIndex * $config.OFFSET_Y});
            $root.currItemIndex++;
        }]);