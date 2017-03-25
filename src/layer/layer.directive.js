(function (angular) {
    'use strict';

    angular.module('merp')
        .directive('mLayer', mLayer);

    function mLayer() {
        return {
            restrict: 'E',
            scope: {
                layerName: '@',
                sourceName: '@',
                style: '@'
            },
            controller: MLayerController
        };
    }

    function MLayerController($scope, sourceService, layerService, ol) {
        if($scope.layerName) {
            sourceService.getSource($scope.sourceName).then(function (source) {
                var layer = new ol.layer.Tile({
                    source: source
                });

                layerService.addLayer($scope.layerName, layer);
            });
        }
    }

})(window.angular);