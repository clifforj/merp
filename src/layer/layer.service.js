(function (angular) {
    'use strict';

    angular.module('merp')
        .factory('layerService', layerService);

    function layerService(promiseUtilService, mapService) {

        var layers = {};
        var getLayerPromises = {};

        return {
            addLayer: addLayer,
            getLayer: getLayer
        };

        /*****/

        function addLayer(layerName, layer, mapName) {
            mapName = mapName || 'default';

            if(!layers[layerName]) {
                layers[layerName] = layer;
                return mapService.getMap(mapName).then(function (map) {
                    map.addLayer(layer);
                    promiseUtilService.resolvePromisesByKey(layerName, layers, getLayerPromises);
                });
            }
        }

        function getLayer(layerName) {
            if(layerName) {
                return promiseUtilService.getKeyFromCollectionObject(layerName, layers, getLayerPromises);
            }
        }
    }

})(window.angular);