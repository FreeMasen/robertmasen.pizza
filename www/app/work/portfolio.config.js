angular
    .module('portfolio')
    .config(['$locationProvider', '$routeProvider', 
                function($locationProvier, $routeProvider) {
                    $locationProvier.hashPrefix('!');
                    $routeProvider
                        .when('/portfolio/lately', {
                            template: '<lately></lately>'
                        })
                        .otherwise({
                            template: '<portfolio></portfolio>'
                        })
                }])