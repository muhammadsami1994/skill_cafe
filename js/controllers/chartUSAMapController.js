dashboard.controller('chartUSAMapCtrl', ['$scope', function($scope) {
    console.log('loaded');
    $scope.hideShowMap = true
    $scope.urls = {
        counties: "us-counties.json",
        states: "us-states.json"
    }
    $scope.margin = { top: 0, right: 0, bottom: 0, left: 0 }
    $scope.width = 865 - $scope.margin.right - $scope.margin.left - $scope.margin.bottom - $scope.margin.top
    $scope.height = 500;
    $scope.path = d3.geo.path();
    $scope.map;

    $scope.q = queue()
        .defer(d3.json, "../../lib/us-counties.json")
        .defer(d3.json, "../../lib/us-states.json")
        .await(ready)

    function ready(error, countylines, statelines) {
        window.error = error;
        window.countylines = countylines;
        window.statelines = statelines;

        if (error) throw error;

        $scope.stateIds = {};
        statelines.features.forEach(function(d) {
            $scope.stateIds[d.id] = d.properties.name;
        });

        countylines.features.forEach(function(d) {
            d.properties.state = $scope.stateIds[d.id.slice(0,2)];
        })

        // remove the loading text
        d3.select('.loading').remove();

        $scope.map = d3.select('#map').append('svg')
            .style('width', $scope.width)
            .style('height', $scope.height);

        $scope.counties = $scope.map.append('g')
            .attr('class', 'counties')
            .selectAll('path')
            .data(countylines.features)
            .enter().append('path')
            .attr('d', $scope.path);

        $scope.counties.on('mouseover', showCaption)
            .on('mousemove', showCaption)
            .on('mouseout', function() {
                $scope.caption.html($scope.starter);
            })
            .on('click', function(event) {
                console.log('clicked')
                console.log(event)
                console.log($scope.data.homePageFilter.list[0].inputValue)
                console.log([event.properties.name, event.properties.state].join(', '))
                $scope.data.homePageFilter.list[0].inputValue = [event.properties.name, event.properties.state].join(', ')
            });

        $scope.states = $scope.map.append('g')
            .attr('class', 'states')
            .selectAll('path')
            .data(statelines.features)
            .enter().append('path')
            .attr('d', $scope.path)
            .on("mouseover", mapMouseOver);

        $scope.caption = d3.select('.caption')
        $scope.starter = $scope.caption.html();


        function mapMouseOver(d){

            d3.selectAll(this)
                .style("fill", "red")
                .style("stroke", "blue");

        }

        function showCaption(d, i) {
            $scope.stateName1 = [d.properties.name, d.properties.state].join(', ');
            $scope.caption.html($scope.stateName1);

        }

    };

    d3.selectAll('pre').attr('class', 'prettyprint')
}]);