angular.module('JobFeedApplication.Filters', [])
    .filter('deptSort', function () {
        return function (items) {
            items.sort(function (a, b) {
                if (parseInt(a.author.name) > parseInt(b.author.name))
                    return 1;
                if (parseInt(a.author.name) < parseInt(b.author.name))
                    return -1;
                return 0;
            })
        };
    })
    .filter('filterSelection', function() {
        return function(type, items, expr) {
            var returnArray = {feed : {entry : []}};
            //console.log(expr);
            if (type === "departments") {
                for (var i =0; i < items.length; i++) {
                    if (expr[type].name == items[i].author.name) {
                        returnArray.feed.entry.push(items[i]);
                    }
                }
            } else if (type === "titles") {
                for (var i =0; i < items.length; i++) {
                    if (expr[type].name == items[i].title) {
                        returnArray.feed.entry.push(items[i]);
                    }
                }
            }
            return returnArray;
            //compareForNestedFiltering = function (actual, expected) {
            //    function contains (actualVal, expectedVal) {
            //        return actualVal.toString().toLowerCase().indexOf(expectedVal.toString().trim().toLowerCase()) !== -1;
            //    }
            //    if(typeof expected !== 'object') return contains(actual, expected);
            //    var result = Object.keys(expected).every(function (key) {
            //        return contains(eval('actual.'+key), eval('expected.'+key));
            //    });
            //    return result;
            //};
        }
    });