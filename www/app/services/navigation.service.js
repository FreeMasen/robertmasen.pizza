angular.module('navigation')
    .service('navigation', ['$rootScope', function($rootScope) {
        function start() {
            $rootScope.$on('$locationChangeSuccess', function(event, c, p) {
                console.log(event);
                console.log(c);
                console.log(p);
            });
        }
        return {
            start: start
        }
    }]);