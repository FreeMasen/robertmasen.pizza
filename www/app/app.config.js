var a = angular.
    module('rm').
        config(['$locationProvider', '$routeProvider', 'navigationProvider',
            function config($locationProvider, $routeProvider, navigationProvider) {
                console.log('Configuring rm');
                var self = this;
                $locationProvider.hashPrefix('!');

                navigationProvider.$get().start();
                
                $routeProvider
                .when('/resume', {
                    template: '<resume></resume>'
                })
                .when('/portfolio', {
                    template: '<work></work>'
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