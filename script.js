var app = angular.module('app', ['ngMaterial']);

app.controller('MainCtrl', function ($scope, $http) {

    $scope.notFound = false;

    $scope.update = function (str) {
        $scope.inputString = str;
        fetch();
    };

    $scope.removeNothingFound = function () {
        $scope.notFound = false;
    };

    $scope.wikiLinkNoSpaces = function(str){
        str = str.replace(/ /g, "_");
        return 'https://en.wikipedia.org/wiki/' + str;
    };

    function fetch() {
        $scope.loading = true;
        var baseUrl = 'https://en.wikipedia.org/w/';
        var params = 'api.php?format=json&action=query&list=search&srsearch=' + $scope.inputString + '&srwhat=text&srprop=snippet&iiprop=timestamp|user|url&continue=';
        var jsonpcb = '&callback=JSON_CALLBACK';
        var url = baseUrl + params + jsonpcb;
        $http.jsonp(url)
            .then(function (response) {

                $scope.results = response.data.query.search;
                if ($scope.results.length === 0) {
                    $scope.notFound = true;
                }
                $scope.loading = false;

            }, function (response) {
                console.log('error: ' + response);
            });
    }
});

app.filter('noHTMLTags', function ($sce) {
    return function (str) {
        return $sce.trustAsHtml(str);
    }
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('amber');
});