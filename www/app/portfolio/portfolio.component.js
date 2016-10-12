angular.module('portfolio')
    .component('portfolio', {
        templateUrl: 'app/portfolio/portfolio.template.html',
        controller: ['$http', function($http) {
            var self = this;
            $http.get('/portfolio')
                .then(function(res) {
                    console.log(res.data.events)
                    self.events = res.data.events
                    self.repos = res.data.repos
                }, function(err) {
                    self.feedback = 'Unable to get portfolio information'
                })
        }]
    })