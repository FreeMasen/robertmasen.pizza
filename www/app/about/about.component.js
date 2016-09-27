angular.module('about').component('about', {
    templateUrl: 'app/about/about.template.html',
    controller: ['$http', function aboutController($http) {
        console.log('about controller const');
        this.life = {};
        var self = this;
        
        $http.get('/about')
        .then(function(res){
            console.log('gotten from /about')
            console.log('setting life');
            self.life = res.data;
        }, function(err){
            console.log(err);
            self.life = {
                title: "Error getting from the server"
            }
        })
    }]
})