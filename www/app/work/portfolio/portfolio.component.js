angular.module('portfolio')
    .component('portfolio', {
        templateUrl: 'app/work/portfolio/portfolio.template.html',
        controller: ['$http', function($http) {
            $http.get('/portfolio')
                .then(function(res) {}, function(err) {});
        }]
    });