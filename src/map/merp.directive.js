(function (angular) {
    'use strict';

    angular.module('merp')
        .directive('merp', merp);

    function merp() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                mapName: '@',
                defaultControls: '@'
            },
            compile: function (element, attributes) {
                if(!attributes.mapName) {
                    attributes.mapName = 'default';
                }
                element.attr('id', attributes.mapName);
            },
            controller: MerpController,
            templateUrl: 'map/merp.html'
        };
    }

    function MerpController($scope, mapService, ol) {
        $scope.defaultControls = $scope.defaultControls === 'true';

        var map = mapService.createMap($scope.mapName, $scope.defaultControls);

        map.setView(new ol.View({
            center: [0, 0],
            zoom: 2
        }));
    }

})(window.angular);