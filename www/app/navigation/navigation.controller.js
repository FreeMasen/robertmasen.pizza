angular.module('navigation')
    .controller('navController', ['$scope','$rootScope', '$location', function($scope, $rootScope, $location){
        var home = {name: 'home', href:'#!/',src:'img/home-text.png'},
            work = {name: 'work', href: '#!/work/resume',src: 'img/work-text.png'}
            resume = {name: 'resume', href:'#!/work/resume', src:'img/resume-text.png'}
            portfolio = {name: 'portfolio', href:'#!/work/portfolio', src:'img/portfolio-text.png'}
            about = {name: 'about', href: '#!/about', src: 'img/about-text.png'},
            contact = {name: 'contact', href: '#!/contact',src: 'img/contact-text.png'},
            empty = {name: 'empty'}
        $scope.endpoint = [];
        $scope.isSub = false
        $scope.elements = [home, work, about, contact]
        $rootScope.$on('$locationChangeSuccess', function() {
                updateNav();
        });

        function updateNav() {
            $scope.endpoint = $location.path().split('/').splice(1);
            if ($scope.endpoint.length < 1 ||
                $scope.endpoint[0] == ''){
                $scope.endpoint = ['home']
            }
            if ($scope.endpoint.includes('work')) {
                $scope.subNav = [resume, portfolio];
                $scope.isSub = true
            } else {
                $scope.isSub = false;
            }
        }

        $scope.isSelected = function(name) {
            var r = $scope.endpoint.includes(name);
            return r
        }
    }])