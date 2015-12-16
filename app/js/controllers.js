'use strict';

/* Controllers */

angular.module('JobFeedApplication')
    // main controller for the application.
    // TODO: break up into smaller, nested controllers for scalability
    // =============================================================================
    .controller('FeedListCtrl', ['$scope', '$rootScope', '$window', '$filter', 'config', 'Feed', 'Departments', 'Titles',
        function ($scope, $root, $window, $filter, $config, Feed, Departments, Titles) {

            // Controls for the feed display
            // =====================================================================
            $scope.sortType     = 'date';   // set the default sort type
            $scope.sortReverse  = true;     // set the default sort order
            $scope.query        = '';       // ngModel for the filter input

            // selection variables
            // =====================================================================
            $scope.selection = {};          // ngModel for the selections
            $scope.selections = {};
            $scope.selectFilter = {};
            $scope.selectionTypes = [
                {name: 'departments', tip: 'Choose a department'},
                {name: 'titles', tip: 'Choose a title'}
            ];

            // Get data from the services
            // =====================================================================
            Feed.get({}, function (data) {
                $scope.feeds = $scope.feedsOrig = data;
            });

            Departments.get({}, function (results) {
                $scope.selections[$scope.selectionTypes[0].name] = results;
            });

            Titles.get({}, function (results) {
                $scope.selections[$scope.selectionTypes[1].name] = results;
            });

            // controller methods
            // =====================================================================
            $scope.clearFilter = function (which) {
                if (typeof which === "undefined") {
                    $scope.query = {};
                    $scope.selection = {};
                    Feed.get({}, function (data) {
                        $scope.feeds = data; // possible_items
                    });
                } else {
                    $scope[which] = {};
                }
            };

            $scope.updateFilter = function (sectionTypeName) {
                $scope.feeds = $scope.feedsOrig;
                for (var i = 0; i < $scope.selectionTypes.length; i++) {
                    if ($scope.selectionTypes[i].name != sectionTypeName) {
                        clearFilter($scope.selectionTypes[i].name);
                    }
                }
                $scope.feeds = $filter('filterSelection')(
                    sectionTypeName,
                    $scope.feeds.feed.entry,
                    $scope.selection
                );
            };

            $scope.tab = function (tabIndex) {
                switch (tabIndex) {
                    case 1: // Sort by date
                        $scope.sortType = 'date';
                        break;
                    case 2: // Sort by title
                        $scope.sortType = 'title';
                        break;
                    case 3: // Sort by department
                        $scope.sortType = 'author.name';
                        break;
                    default:
                        $scope.sortType = 'date';
                }
                $scope.sortReverse = !$scope.sortReverse;
            };

            $scope.sort = function (item) {
                if ($scope.sortType == 'date') {
                    // need to convert to Date object to sort
                    return new Date(item.published);
                }
                if ($scope.sortType == 'author.name') {
                    return item.author.name;
                }
                return item[$scope.sortType];
            };

        }]);
