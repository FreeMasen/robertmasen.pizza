angular.module('work')
    .component('work',{
        templateUrl: 'app/work/work.template.html',
        controller: ['$route', '$location', 
        function($route, $location) {
            console.log('work controller');
            console.log($location)
            var self = this;
            self.subNav = [{
                link: "!/work/resume",
                src: "img/resume-text.png"
            },
            {
                link: "!/work/portfolio",
                src: "img/portfolio.text.png"
            }];

            console.log($route)
            // $routeProvider
            // .when('/work/resume', function() {
            //     self.templateUrl = 'app/work/resume/resume.template.html'
            // })
            // .when('/work/portfolio', function() {
            //     self.templateUrl = 'app/work/portfolio/portfolio.template.html'
            // })
        }]
    })