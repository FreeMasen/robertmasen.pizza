angular.
    module('resume').
    component('resume', {
        templateUrl: 'app/resume/resume.template.html',
        controller: ['$http', function resumeController($http) {
            console.log('resume controller const')
            this.jobs = [];
            var self = this;
            
            $http.get('/resume').then(function(req, res) {
                self.hasError = false;
                self.errorText = '';
                self.jobs = res.body;
            }, function(err) {
                self.hasError = true;
                self.errorText = 'Sorry, unable to get jobs, please contact the site administrator';
                console.log(err);
            })
        }]
    });