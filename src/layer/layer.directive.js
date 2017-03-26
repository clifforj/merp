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

    function MLayerController($scope, sourceService, layerService, ol, $q) {
        var vm = this;

        vm.readyPromises = [];

        initialise();

        /*****/

        function initialise() {
            if($scope.layerName) {

                if($scope.sourceName) {
                    vm.readyPromises.push(waitForSource());
                }
                $q.all(vm.readyPromises).then(createLayer);
            }
        }

        function createLayer() {
            switch($scope.layerType) {
                case 'tile':
                    createTileLayer();
                    break;
                case 'vector':
                    createVectorLayer();
            }
        }

        function createVectorLayer() {
            var layer = new ol.layer.Vector({
                source: vm.source
            });

            layerService.addLayer($scope.layerName, layer);
        }

        function createTileLayer() {
            var layer = new ol.layer.Tile({
                source: vm.source
            });

            layerService.addLayer($scope.layerName, layer);
        }

        function waitForSource() {
            return sourceService.getSource($scope.sourceName).then(function (source) {
                vm.source = source;
            });
        }

    }

})(window.angular);