angular.module('contact')
    .component('contact', {
        templateUrl: 'app/contact/contact.template.html',
        controller: ['$http', function($http){
            var self = this;



            defaultUser = {
                reason: ''
            }

            self.message = '';
            self.send = function() {
                console.log('send')
                
                $http.post('/contact',JSON.stringify(self.user) ,(res) => {
                    self.message = res.data.message
                }, (err) => {
                    self.message = 'error sending your message'
                })
            }

            self.reset = function() {
                self.user = angular.copy(defaultUser)
                self.contact.$setPristine()
                self.contact.$setUntouched()
            }
            self.user = angular.copy(defaultUser)
        }]
    });