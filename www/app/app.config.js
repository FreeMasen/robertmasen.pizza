angular.
    module('rm').
        config(['$locationProvider', '$routeProvider', 
            function config($locationProvider, $routeProvider) {
                console.log('Configuring rm');
                var self = this;
                $locationProvider.hashPrefix('!');


                $routeProvider
                .when('/resume', {
                    template: '<resume></resume>'
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