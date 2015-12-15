angular.module('JobFeedApplication.Services', [])
    .factory('Feed', ['$http', 'config', function ($http, config) {

        function searchJson(obj) {
            var result = null;
            if (obj instanceof Array) {
                for (var i = 0; i < obj.length; i++) {
                    result = searchJson(obj[i]);
                    if (result) {
                        break;
                    }
                }
            }
            else {
                for (var prop in obj) {
                    console.log(prop + ': ' + obj[prop]);
                    if (prop == 'id') {
                        if (obj[prop] == 1) {
                            return obj;
                        }
                    }
                    if (obj[prop] instanceof Object || obj[prop] instanceof Array) {
                        result = searchJson(obj[prop]);
                        if (result) {
                            break;
                        }
                    }
                }
            }
            return result;
        }

        return {
            get: function (params, callback) {
                $http.get(
                    config.DATA_SOURCE,
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
                                //key = params.split(".");
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
    }])
    // TODO: Abstract this to get any unique list of XML text nodes
    .factory('Departments', ['$http', 'config',
        function($http, $config){
            return {
                get: function (params, callback) {
                    $http.get(
                        $config.DATA_SOURCE,
                        {
                            transformResponse: function (xmlDoc) {
                                // Get distinct list of departments,
                                // convert the data to JSON and provide
                                // it to the success function below.
                                var uniqueEls = $(xmlDoc).xpath("fn:distinct-values(//author/name)");
                                var uniqueElsArray = Array.prototype.slice.call(uniqueEls, 0);
                                uniqueElsArray.sort();
                                var returnObj = [];
                                var j = 0;
                                for (var i = 0; i < uniqueElsArray.length; i++) {
                                    if (typeof uniqueElsArray[i] != "undefined" && uniqueElsArray[i] != "") {
                                        returnObj.push({id: ++j, name: uniqueElsArray[i]});
                                    }
                                }
                                //if ($config.DEBUG) console.log(returnObj);
                                return returnObj;
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
                                        if ($config.DEBUG) console.log("params[" + key + "] = " + params[key]);
                                        if ($config.DEBUG) console.log("entries[i][" + key + "] = " + entries[i][key]);
                                        if (params[key] == entries[i][key]) {
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
            };
            //var departments = $resource('../data/all_jobs.atom');
            //return $resource('../data/all_jobs.atom', {}, {
            //    get: {method:'GET', isArray:true}
            //});
        }])
    .factory('Titles', ['$http', 'config',
        function($http, $config){
            return {
                get: function (params, callback) {
                    $http.get(
                        $config.DATA_SOURCE,
                        {
                            transformResponse: function (xmlDoc) {
                                // Get distinct list of departments,
                                // convert the data to JSON and provide
                                // it to the success function below.
                                var uniqueEls = $(xmlDoc).xpath("fn:distinct-values(//title )");
                                var uniqueElsArray = Array.prototype.slice.call(uniqueEls, 0);
                                uniqueElsArray.sort();
                                var returnObj = [];
                                var j = 0;
                                for (var i = 0; i < uniqueElsArray.length; i++) {
                                    if (typeof uniqueElsArray[i] != "undefined" && uniqueElsArray[i] != "") {
                                        returnObj.push({id: ++j, name: uniqueElsArray[i]});
                                    }
                                }
                                return returnObj;
                            }
                        }
                    ).
                    success(function (data, status) {
                        // send the converted data back
                        // to the callback function
                        callback(data);
                    })
                }
            };
        }])
    .factory('DepartmentFilter', function() {
        return function (input) {
            return input;
        }
    });
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