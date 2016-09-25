angular.
    module('resume').
    component('resume', {
        templateUrl: 'app/resume/resume.template.html',
        controller: ['$http', function resumeController($http) {
            console.log('resume controller const')
            var self = this;
            
            $http.get('/resume').then(function(res) {
                self.hasError = false;
                self.errorText = '';
                self.qualifications = res.data;
            }, function(err) {
                self.hasError = true;
                self.errorText = 'Sorry, unable to get jobs, please contact the site administrator';
                console.log(err);
            })
        }]
    });