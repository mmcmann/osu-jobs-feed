/**
 * License: MIT
 */

// Declare app level module which depends on views, and components
// TODO: Get rid of global 'app' variable
angular.module('JobFeedApplication', [
    'ngRoute',
    'ngAnimate',
    'com.mmcmann.services',
    'com.mmcmann.directives'
])
.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/jobs', {
                title: 'Job List',
                templateUrl: 'partials/feed-list.html',
                controller: 'FeedListCtrl'
            })
            .when('/jobs/:id', {
                title: 'Job Detail',
                templateUrl: 'partials/feed-detail.html',
                controller: 'FeedDetailCtrl'
            })
            .otherwise({
                redirectTo: '/jobs'
            });
    }
]);