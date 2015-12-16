angular.module('JobFeedApplication.Services', [])
    .factory('Feed', ['$http', 'config', function ($http, config) {
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
                    var returnObject = {"feed" : {"entry" : []}};
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
                                    //console.log("params[" + key + "] = " + params[key]);
                                    //console.log("entries[i][" + key + "] = " + entries[i][key]);
                                    if (params[key] == entries[i][key]) {
                                        //console.log(entries[i]);
                                        returnObject.feed["entry"].push(entries[i]);
                                    }
                                }
                            }
                        }
                        data = returnObject;
                    }
                    callback(data);
                })
            }
        }
    }])
    // TODO: Abstract these to get any unique list of XML text nodes
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
                                        //if ($config.DEBUG) console.log("params[" + key + "] = " + params[key]);
                                        //if ($config.DEBUG) console.log("entries[i][" + key + "] = " + entries[i][key]);
                                        if (params[key] == entries[i][key]) {
                                            returnData.feed["entry"].push(entries[i]);
                                        }
                                    }
                                }
                            }
                            data = returnData;
                        }
                        callback(data);
                    })
                }
            };
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
                                var uniqueEls = $(xmlDoc).xpath("fn:distinct-values(//title)");
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
    ;