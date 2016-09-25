angular.module('rm')
    .service(function() {
        return function(path) {
            var eles = document.getElementsByClassName('navigation')

            if (!path) {
                for (i=0;i<eles.length;i++) {
                    eles.className += ' top';
                }
            } else {
                for (i=0;i<eles.length;i++) {
                    eles.className = elesClassName.substring(0, eles.className.length - 4);
                }
            }
        }
    })