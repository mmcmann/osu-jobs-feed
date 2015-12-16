angular.module('JobFeedApplication.Filters', [])
    .filter('filterSelection', function() {
        return function(type, items, expr) {
            var returnObject = {feed : {entry : []}};
            if (type === "departments") {
                for (var i =0; i < items.length; i++) {
                    if (expr[type].name == items[i].author.name) {
                        returnObject.feed.entry.push(items[i]);
                    }
                }
            } else if (type === "titles") {
                for (var i =0; i < items.length; i++) {
                    if (expr[type].name == items[i].title) {
                        returnObject.feed.entry.push(items[i]);
                    }
                }
            }
            return returnObject;
        }
    });