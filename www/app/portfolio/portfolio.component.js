angular.module('portfolio')
    .component('portfolio', {
        templateUrl: 'app/portfolio/portfolio.template.html',
        controller: ['$http', function($http) {
            var self = this;
            $http.get('/portfolio')
                .then(function(res) {
                    self.gh = res.data;
                }, function(err) {});
        }]
    });