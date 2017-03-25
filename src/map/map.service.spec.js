describe('map service', function() {
    var scope, mapService;

    beforeEach(inject(function($rootScope, _mapService_) {
        mapService = _mapService_;
        scope = $rootScope.$new();
    }));

    it('should create maps with the given name', function () {
        var map = mapService.createMap('default', false);
        expect(map.getTarget()).toBe('default');
    });

    it('should create maps with and without default controls', function () {
        spyOn(ol.control, 'defaults').and.callThrough();

        mapService.createMap('default', false);
        expect(ol.control.defaults).not.toHaveBeenCalled();

        mapService.createMap('default', true);
        expect(ol.control.defaults).toHaveBeenCalled();
    });

    describe('getMap', function () {
        it('should return a promise, resolved when the map exists', function () {
            var map;
            mapService.getMap('potato').then(function (result) {
                map = result;
            });

            mapService.createMap('potato', false);

            scope.$digest();

            expect(map).toBeDefined();
        });

        it('should return the default map when no parameters are provided', function () {
            var map;
            mapService.getMap().then(function (result) {
                map = result;
            });

            mapService.createMap('default', false);

            scope.$digest();

            expect(map).toBeDefined();
        });
    });

});