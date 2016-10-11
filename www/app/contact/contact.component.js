angular.module('contact')
    .component('contact', {
        templateUrl: 'app/contact/contact.template.html',
        controller: ['$http', function($http){
            var self = this;

            defaultMessage = {
                reason: ''
            }

            self.response = ''
            self.send = function() {
                console.log('send')
                $http.post('/contact', JSON.stringify(self.message))
                .then(function (res) {
                    console.log('response')
                    console.log(res.data)
                    self.response = res.data
                    self.reset()
                }, function (err) {
                    console.log('error')
                    console.log(err)
                    self.response = 'error sending your message'
                })
            }

            self.reset = function() {
                self.message = angular.copy(defaultMessage)
                
                self.contact.$setPristine()
                self.contact.$setUntouched()
            }
            self.user = angular.copy(defaultMessage)
        }]
    });