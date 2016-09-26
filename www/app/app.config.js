angular.
    module('rm').
        config(['$locationProvider', '$routeProvider', 
            function config($locationProvider, $routeProvider) {
                console.log('Configuring rm');
                $locationProvider.hashPrefix('!');


                $routeProvider
                .when('/work', {
                    template: '<work></work>'
                })
                .when('/about', {
                    template: '<about></about>'
                })
                .when('/work', {
                    template: '<lately></lately>'
                })
                .otherwise({
                    template: ''
                });
                }
        ]);

// angular.module('rm').run(['$rootScope', '$location','navigation', function($rootScope, $location, navigation) {
//                 $rootScope.$on('$routeChangeSuccess', (event, c, p) => {
//                     navigation($location.$$path);
//                 })
// }])