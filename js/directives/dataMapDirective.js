dashboard
	.directive('usaDataMap', function($timeout) {
    return {
        restrict: 'E',
        scope: {
            stateClick:"=stateClick"
        },
        link: function (scope, element) {
            scope.element = element[0];
            scope.lastActive="";
            scope.limit = false;
            var defaultOptions = {
                scope: 'usa', //currently supports 'usa' and 'world', however with custom map data you can specify your own
                projection: 'mercator', //style of projection to be used. try "mercator"
                done: function(datamap) {
                    datamap.labels();
                    datamap.resize();
                    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                        fillState(geography);
                        scope.stateClick(geography)
                    });
                    
                    
                }, //callback when the map is done drawing
                fills: {
                    defaultFill: '#84A4CC', //the keys in this object map to the "fillKey" of [data] or [bubbles]
                    active:'#FF8A4A'
                },
                data:{},
                responsive:true,
                dataType: 'json', //for use with dataUrl, currently 'json' or 'csv'. CSV should have an `id` column
                dataUrl: null, //if not null, datamaps will attempt to fetch this based on dataType ( default: json )
                element: scope.element
            };



            scope.map = new Datamap(defaultOptions);

            function fillState(geography){
                var _updateObj={};
                /*Clear Last Active State*/
                if(scope.lastActive){
                    _updateObj[scope.lastActive]={
                        'fillKey':'defaultFill'
                    };   
                    scope.map.updateChoropleth(_updateObj);
                    lastActive="";
                    _updateObj={};
                }

                _updateObj[geography.id]={
                    'fillKey':'active'
                };
                scope.lastActive=geography.id;
                $timeout(function(){
                    scope.map.updateChoropleth(_updateObj);    
                },10)
            }
            
        }
    };
});