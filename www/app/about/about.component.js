angular.module('about').component('about', {
    template: 'about.template.html',
    controller: ['$http', function($http) {
        var self = this;

        $http.get('/about')
    }]
})