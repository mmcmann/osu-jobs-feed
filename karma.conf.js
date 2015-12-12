module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'app/vendor/angular/angular.js',
            'app/vendor/angular-route/angular-route.js',
            'app/vendor/angular-mocks/angular-mocks.js',
            'app/components/**/*.js',
            'tests/unit/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
