dashboard.directive('locationData', function() {
    return {
        template: '<div id="container" class="data-map-container" style="height: 560px; ;background-color: #ffffff"></div>',
        scope: {
            locationOutput: '=locationOutput'
        },
        link: function($scope, element, attrs) {
            console.log('directive loaded');
            $scope.countryColors = {
                '1':'#596500',
                '2':'#5f6b00',
                '3':'#637000',
                '4':'#687500',
                '5':'#6c7a00',
                '6':'#718000',
                '7':'#758500',
                '8':'#7a8a00',
                '9':'#7e8f00',
                '10':'#839400',
                '11':'#879900',
                '12':'#8c9e00',
                '13':'#90a300',
                '14':'#95a800',
                '15':'#99ad00',
                '16':'#9eb300',
                '17':'#a2b800',
                '18':'#a7bd00',
                '19':'#abc200',
                '20':'#b0c700',
                '21':'#b4cc00',
                '22':'#b9d100',
                '23':'#bdd600',
                '24':'#c2db00',
                '25':'#c6e000',
                '26':'#cbe500',
                '27':'#cfeb00',
                '28':'#d4f000',
                '29':'#d8f500',
                '30':'#ddfa00',
                '31':'#e1ff00',
                '32':'#e2ff05',
                '33':'#e2ff0a',
                '34':'#e3ff0f',
                '35':'#e4ff14',
                '36':'#e4ff1a',
                '37':'#e5ff1f',
                '38':'#e5ff24',
                '39':'#e6ff29',
                '40':'#e7ff2e',
                '41':'#e7ff33',
                '42':'#e8ff38',
                '43':'#e8ff3d',
                '44':'#e9ff42',
                '45':'#eaff47',
                '46':'#eaff4c',
                '47':'#ebff52',
                '48':'#ebff57',
                '49':'#ecff5c',
                '50':'#edff61'
            };
            $scope.countries ={
                "AZ": {
                    "fillKey": "1",
                    "electoralVotes": 1
                },
                "CO": {
                    "fillKey": "2",
                    "electoralVotes": 2
                },
                "DE": {
                    "fillKey": "3",
                    "electoralVotes": 3
                },
                "FL": {
                    "fillKey": "4",
                    "electoralVotes": 4
                },
                "GA": {
                    "fillKey": "5",
                    "electoralVotes": 5
                },
                "HI": {
                    "fillKey": "6",
                    "electoralVotes": 6
                },
                "ID": {
                    "fillKey": "7",
                    "electoralVotes": 7
                },
                "IL": {
                    "fillKey": "8",
                    "electoralVotes": 50
                },
                "IN": {
                    "fillKey": "9",
                    "electoralVotes": 8
                },
                "IA": {
                    "fillKey": "10",
                    "electoralVotes": 9
                },
                "KS": {
                    "fillKey": "11",
                    "electoralVotes": 10
                },
                "KY": {
                    "fillKey": "12",
                    "electoralVotes": 11
                },
                "LA": {
                    "fillKey": "13",
                    "electoralVotes": 12
                },
                "MD": {
                    "fillKey": "14",
                    "electoralVotes": 13
                },
                "ME": {
                    "fillKey": "15",
                    "electoralVotes": 14
                },
                "MA": {
                    "fillKey": "16",
                    "electoralVotes": 15
                },
                "MN": {
                    "fillKey": "17",
                    "electoralVotes": 16
                },
                "MI": {
                    "fillKey": "18",
                    "electoralVotes": 17
                },
                "MS": {
                    "fillKey": "19",
                    "electoralVotes": 18
                },
                "MO": {
                    "fillKey": "20",
                    "electoralVotes": 19
                },
                "MT": {
                    "fillKey": "21",
                    "electoralVotes": 20
                },
                "NC": {
                    "fillKey": "22",
                    "electoralVotes": 21
                },
                "NE": {
                    "fillKey": "23",
                    "electoralVotes": 22
                },
                "NV": {
                    "fillKey": "24",
                    "electoralVotes": 23
                },
                "NH": {
                    "fillKey": "25",
                    "electoralVotes": 24
                },
                "NJ": {
                    "fillKey": "26",
                    "electoralVotes": 25
                },
                "NY": {
                    "fillKey": "27",
                    "electoralVotes": 26
                },
                "ND": {
                    "fillKey": "28",
                    "electoralVotes": 27
                },
                "NM": {
                    "fillKey": "29",
                    "electoralVotes": 28
                },
                "OH": {
                    "fillKey": "30",
                    "electoralVotes": 29
                },
                "OK": {
                    "fillKey": "31",
                    "electoralVotes": 30
                },
                "OR": {
                    "fillKey": "32",
                    "electoralVotes": 31
                },
                "PA": {
                    "fillKey": "33",
                    "electoralVotes": 32
                },
                "RI": {
                    "fillKey": "34",
                    "electoralVotes": 33
                },
                "SC": {
                    "fillKey": "35",
                    "electoralVotes": 34
                },
                "SD": {
                    "fillKey": "36",
                    "electoralVotes": 35
                },
                "TN": {
                    "fillKey": "37",
                    "electoralVotes": 36
                },
                "TX": {
                    "fillKey": "38",
                    "electoralVotes": 37
                },
                "UT": {
                    "fillKey": "39",
                    "electoralVotes": 38
                },
                "WI": {
                    "fillKey": "40",
                    "electoralVotes": 39
                },
                "VA": {
                    "fillKey": "41",
                    "electoralVotes": 40
                },
                "VT": {
                    "fillKey": "42",
                    "electoralVotes": 41
                },
                "WA": {
                    "fillKey": "43",
                    "electoralVotes": 42
                },
                "WV": {
                    "fillKey": "44",
                    "electoralVotes": 43
                },
                "WY": {
                    "fillKey": "45",
                    "electoralVotes": 44
                },
                "CA": {
                    "fillKey": "46",
                    "electoralVotes": 45
                },
                "CT": {
                    "fillKey": "47",
                    "electoralVotes": 46
                },
                "AK": {
                    "fillKey": "48",
                    "electoralVotes": 47
                },
                "AR": {
                    "fillKey": "49",
                    "electoralVotes": 48
                },
                "AL": {
                    "fillKey": "50",
                    "electoralVotes": 49
                }
            };
            $scope.election = new Datamap({
                scope: 'usa',
                element: document.getElementById('container'),
                //height:700,
                //width: 1000,
                //responsive: true,
                geographyConfig: {
                    animate: true,
                    highlightBorderColor: '#faaa6b',
                    highlightOnHover: true,
                    highlightBorderWidth: 4,
                    highlightFillColor: false,
                    popupOnHover: true,
                    popupTemplate: function(geography, data) {
                        return '<div class="hoverinfo">' + geography.properties.name + 'Electoral Votes:' +  data.electoralVotes + ' '
                    }
                },
                done: function(datamap) {
                    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                        $scope.locationOutput = geography.properties.name;
                    });


                },
                fills: $scope.countryColors,
                data: $scope.countries
            });
            $scope.election.labels();

            console.log("++++++++++++++++++++"+$scope.locationOutput+"+++++++++++")
        }
    };
});
/*
 {
 'Republican': '#bcce96',
 'Democrat': '#ddebca',
 'Heavy Democrat': '#eaf2de',
 'Light Democrat': '#cad7a8',
 'Heavy Republican': '#CA5E5B',
 'Light Republican': '#EAA9A8',
 defaultFill: '#ddebca'
 }
*/