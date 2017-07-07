angular.module('portfolio')
    .component('portfolio', {
        templateUrl: 'app/portfolio/portfolio.template.html',
        controller: ['$http', function($http) {
            var self = this;
            $http.get('/portfolio')
                .then(function(res) {
                    console.log(res.data)
                    self.events = res.data.events
                    self.repos = res.data.repos
                    self.visuals = res.data.visuals
                    fillVis(res.data.visuals);
                }, function(err) {
                    self.feedback = 'Unable to get portfolio information'
                })
            function fillVis(visuals) {
                var total = 0;
                for (var i = 0; i < visuals.length; i++) {
                    total += visuals[i].count;
                }
                d3.select('#vis')
                    .selectAll('div')
                    .data(visuals)
                    .enter()
                    .append('div')
                    .style('width', function(visual) {
                        return (visual.count / total) * 100 + '%';
                    })
                    .style('background-color', '#cc6959')
                    .text(function(visual) {
                        return visual.name + '(' + visual.count + ')';
                    });
            }
        }]

    })