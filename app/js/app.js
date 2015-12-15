/**
 * License: MIT
 */

// TODO: Animate sort: http://codepen.io/daleyjem/pen/xbZYpY
// TODO: Autocomplete
// TODO: Mobile
// TODO: Debug output and try/catch blocks
// TODO: Dashboard: http://www.matchwork.com/job-board-features-and-services/job-search-jobseeker-interface/jobseeker-dashboard/

// Declare app level module which depends on views, and components
// TODO: Get rid of global 'app' variable
angular.module('JobFeedApplication', [
        'ngRoute',
        'ngAnimate',
        'JobFeedApplication.Services',
        'JobFeedApplication.Directives',
        'JobFeedApplication.Filters'
    ])
    .constant('config', {
        VERSION: '0.0.1',
        DEBUG: true,
        OFFSET_Y: 121,
        DATA_SOURCE: '../data/all_jobs.atom'
    })
    .config(['$routeProvider',
        function ($routeProvider) {
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
                .when('/dashboard', {
                    title: 'Job Dashboard',
                    templateUrl: 'partials/dashboard.html'
                })
                .when('/404', {
                    title: 'Resource not found',
                    templateUrl: 'partials/404.html'
                })
                .otherwise({
                    redirectTo: '/jobs'
                });
        }
    ]);

var mmUtilities = mmUtilities || {};

mmUtilities.types = {
    isNotString: function(str) {
        return (typeof str !== "string");
    },
    isNumeric: function(val) {
        return (!isNaN(val));
    },
    isJSON: function(val) {
        if (typeof val === "object") {
            try {
                val = JSON.stringify(val);
            } catch (e) {
                return false;
            }
        }
        try {
            JSON.parse(val);
        } catch (e) {
            return false;
        }
        return true;
    }
};