dashboard.controller('MapCtrl', ['$scope', '$compile',function($scope, $compile) {

    function initialize() {
        var myLatlng = new google.maps.LatLng(29.650306499999996, -82.3326653);
        var mapOptions = {
            center: myLatlng,
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var contentString = "<div><h3>SkillCafe, University of Florida, Innovation Hub.</h3></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'SkillCafe Office)'
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });

        $scope.map = map;
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    initialize();

}]);