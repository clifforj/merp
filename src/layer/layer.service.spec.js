describe('layer service', function() {
    var scope, layerService, mapService, map, layer;

    beforeEach(inject(function($rootScope, _layerService_, _mapService_) {
        layerService = _layerService_;
        mapService = _mapService_;
        scope = $rootScope.$new();

        map = mapService.createMap('default', false);
        layer = new ol.layer.Tile();
    }));

    describe('addLayer', function () {
        it('should add layers to maps', function () {
            layerService.addLayer('myLayer', layer);

            scope.$digest();

            expect(map.getLayers().getLength()).toBe(1);
        });

        it('should only allow unique layer names', function () {
            layerService.addLayer('myLayer', layer);
            layerService.addLayer('myLayer', layer);

            scope.$digest();

            expect(map.getLayers().getLength()).toBe(1);
        });

        it('should add layers to specific maps', function () {
            var myMap = mapService.createMap('myMap', false);

            layerService.addLayer('myLayer', layer, 'myMap');

            scope.$digest();

            expect(myMap.getLayers().getLength()).toBe(1);
        });
    });

    describe('getLayer', function () {
        it('should return a promise, resolved when the map exists', function () {
            var myLayer;
            layerService.getLayer('potato').then(function (result) {
                myLayer = result;
            });

            layerService.addLayer('potato', layer);

            scope.$digest();

            expect(myLayer).toBeDefined();
        });

        it('should return undefined when no layerName is specified', function () {
           expect(layerService.getLayer()).toBeUndefined();
        });
    });
});