angular.module('portfolio')
    .component('portfolio', {
        templateUrl: 'app/portfolio/portfolio.template.html',
        controller: ['$http', function($http) {
            var self = this;
            $http.get('/portfolio')
                .then(function(res) {
                    console.log(res.data)
                    self.events = res.data.events
                    self.repos = res.data.repos
                    self.projects = res.data.projects
                }, function(err) {
                    self.feedback = 'Unable to get portfolio information'
                })
        }]
    })