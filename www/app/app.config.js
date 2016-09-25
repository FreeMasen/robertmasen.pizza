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
                .when('/lately', {
                    template: '<lately></lately>'
                })
                .otherwise({
                    template: '<h1>Under Development</h1>'
                });
                }
        ]);

// angular.module('rm').run(['$rootScope', '$location','navigation', function($rootScope, $location, navigation) {
//                 $rootScope.$on('$routeChangeSuccess', (event, c, p) => {
//                     navigation($location.$$path);
//                 })
// }])