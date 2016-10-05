angular.module('contact')
    .component('contact', {
        templateUrl: 'app/contact/contact.template.html',
        controller: ['$http', function($http){
            var self = this;

            self.user = {
                reason: '',

            }
        }]
    });