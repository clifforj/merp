(function (angular) {
    'use strict';

    angular.module('merp')
        .directive('mLayer', mLayer);

    function mLayer() {
        return {
            restrict: 'E',
            scope: {
                layerName: '@',
                layerType: '@',
                sourceName: '@',
                style: '@'
            },
            controller: MLayerController
        };
    }

    function MLayerController($scope, sourceService, layerService, ol) {
        var vm = this;

        initialise();

        /*****/

        function initialise() {
            if($scope.layerName) {
                if($scope.layerType) {
                    switch($scope.layerType) {
                        case 'vector':
                            createVectorLayer();
                            break;
                    }
                } else {
                    sourceService.getSource($scope.sourceName).then(function (source) {
                        var layer = new ol.layer.Tile({
                            source: source
                        });

                        layerService.addLayer($scope.layerName, layer);
                    });
                }

            }
        }

        function createVectorLayer() {
            sourceService.getSource($scope.sourceName).then(function (source) {
                var layer = new ol.layer.Vector({
                    source: source
                });

                layerService.addLayer($scope.layerName, layer);
            });
        }

    }

})(window.angular);