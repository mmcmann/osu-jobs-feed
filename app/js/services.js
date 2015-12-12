angular.module('com.mmcmann.services', [])
    .factory('Feed', ['$http', function ($http) {
        return {
            get: function (callback) {
                $http.get(
                    '../data/all_jobs.atom',
                    {
                        transformResponse: function (data) {
                            // convert the data to JSON and provide
                            // it to the success function below
                            var json;
                            var x2js = new X2JS();
                            json = x2js.xml_str2json(data);
                            return json;
                        }
                    }
                ).
                success(function (data, status) {
                    // send the converted data back
                    // to the callback function
                    callback(data);
                })
            }
        }
    }]);
/*
    .factory('Feed', ['$resource',
        function($resource){
            return $resource('../data/all_jobs.atom', {}, {
                get: {method:'GET', isArray:true}
            });
        }]);
    .factory("Feed", ['$http',
        function ($http) { // This service connects to our REST API

            // TODO: Move to config file
            var serviceBase = '../data/all_jobs.atom';

            var obj = {};
            obj.get = function (q) {
                if (typeof q == "undefined") q = "";
                return $http.get(serviceBase + q).then(function (results) {
                    return results.data;
                });
            };
            //obj.post = function (q, object) {
            //    return $http.post(serviceBase + q, object).then(function (results) {
            //        return results.data;
            //    });
            //};
            //obj.put = function (q, object) {
            //    return $http.put(serviceBase + q, object).then(function (results) {
            //        return results.data;
            //    });
            //};
            //obj.delete = function (q) {
            //    return $http.delete(serviceBase + q).then(function (results) {
            //        return results.data;
            //    });
            //};

            return obj;
}]);
*/