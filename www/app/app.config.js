var a = angular.
    module('rm').
        config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
                var self = this;
                $locationProvider.hashPrefix('!');
                
                $routeProvider
                .when('/work/resume', {
                    template: '<resume></resume>'
                })
                .when('/work/portfolio', {
                    template: '<portfolio></portfolio>'
                })
                .when('/about', {
                    template: '<about></about>'
                })
                .when('/contact', {
                    template: '<contact></contact>'
                })
                .otherwise({
                    template: ''
                });
                }
        ]);