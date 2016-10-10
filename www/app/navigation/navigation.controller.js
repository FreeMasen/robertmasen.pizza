angular.module('navigation')
    .controller('navController', ['$scope','$rootScope', '$location', 
                function($scope, $rootScope, $location) {
        let home = {name: 'home', 
        link: {href:"/",
                display:'Home'}
        },
            work = {name: 'work', 
            link: {href:'#!/work/resume',
                display:'Work'},
            subs: [
                {name: 'resume',
                href:'#!/work/resume',
                display: 'Resume'},
                {name: 'portfolio',
                href:'#!/work/portfolio',
                display: 'Portfolio'}
            ]},
            about = {name: 'about', 
            link: {href:'#!/about',
                display: 'About'}
            },
            contact = {name: 'contact', 
            link: {href: '#!/contact',
                display: 'Contact'}
            }        
            $scope.endpoint = [];
        $scope.isSub = false
        $scope.elements = [home, work, about, contact]
        $rootScope.$on('$locationChangeSuccess', function() {
                updateNav();
        });
        $scope.highlighted = ''
        $scope.highlight = function(name) {
            $scope.highlighted = name
        }

        function updateNav() {
            $scope.endpoint = $location.path().split('/').splice(1);
            if ($scope.endpoint.length < 1 ||
                $scope.endpoint[0] == ''){
                $scope.endpoint = ['home']
            }
            if ($scope.endpoint.includes('work')) {
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