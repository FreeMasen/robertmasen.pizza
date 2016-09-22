angular.
    module('rm').
        config(['$locationProvider', '$routeProvider', 
            function config($locationProvider, $routeProvider) {
                console.log('Configuring rm');
                $locationProvider.hashPrefix('!');

                $routeProvider
                .when('/resume', {
                    template: '<resume></resume>'
                })
                .when('/portfolio', {
                    template: '<portfolio></portfolio>'
                })
                .otherwise({
                    template: '<h1>Under Development</h1>'
                })
        }]);