(function (angular) {
    'use strict';

    angular.module('merp')
        .directive('mSource', mSource);

    function mSource() {
        return {
            restrict: 'E',
            scope: {
                sourceName: '@',
                sourceType: '@',
                sourceUrl: '@'
            },
            controller: MSourceController
        };
    }

    function MSourceController($scope, sourceService, ol) {
        var vm = this;

        initialise();

        /*****/

        function initialise() {
            if($scope.sourceName) {
                if($scope.sourceType) {
                    $scope.sourceType = $scope.sourceType.toLowerCase();
                    switch ($scope.sourceType) {
                        case 'vector':
                            var source = createVectorSource();
                            sourceService.addSource($scope.sourceName, source);
                    }
                } else {
                    sourceService.addSource($scope.sourceName, new ol.source.OSM());
                }
            }
        }

        function createVectorSource() {
            if($scope.sourceUrl) {
                return new ol.source.Vector({
                    url: $scope.sourceUrl,
                    format: new ol.format.GeoJSON()
                });
            }
        }
    }

})(window.angular);