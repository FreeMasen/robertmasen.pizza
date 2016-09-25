angular.module('lately').
    component('lately', {
        templateUrl: 'app/portfolio/lately/lately.template.html',
        controller: ['$http', function($http) {
            var self = this;
            $http.get('/lately').then(function(res) {
                console.log('response recieved in lately');
                self.activities = res.body;
            }, function(err) {
                console.log('error recieved in lately')
                console.log(err);
                self.error = 'Error in getting activities';
            })
        }]
    })