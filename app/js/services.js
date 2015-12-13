angular.module('JobFeedApplication.Services', [])
    .factory('Feed', ['$http', 'localConfig', function ($http, localConfig) {
        return {
            get: function (params, callback) {
                $http.get(
                    localConfig.DATA_SOURCE,
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
                    var key, count = 0;
                    var returnData = {"feed" : {"entry" : []}};
                    for(key in params) {
                        if(params.hasOwnProperty(key)) {
                            count++;
                        }
                    }
                    if (count > 0) {
                        var entries = data.feed.entry;
                        for (var i = 0; i < entries.length; i++) {
                            for(key in params) {
                                if(params.hasOwnProperty(key)) {
                                    console.log("params[" + key + "] = " + params[key]);
                                    console.log("entries[i][" + key + "] = " + entries[i][key]);
                                    if (params[key] == entries[i][key]) {
                                        //console.log(entries[i]);
                                        returnData.feed["entry"].push(entries[i]);
                                    }
                                }
                            }
                        }
                        data = returnData;
                    }
                    //console.log(returnData);
                    //console.log(data);
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