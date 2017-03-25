describe('merp directive', function() {
    var $compile, merp, merpController, scope, mapService;

    beforeEach(inject(function($rootScope, _$compile_, _mapService_) {
        $compile = _$compile_;
        mapService = _mapService_;
        spyOn(mapService, 'createMap').and.callThrough();

        scope = $rootScope.$new();

        merp = $compile(angular.element('<merp></merp>'))(scope);
        scope.$digest();

        merpController = merp.controller('merp');
    }));

    it('should set a default map name', function () {
        expect(merp.isolateScope().mapName).toBe('default');
    });

    it('should take in a map name and default control state', function () {
        var myMap = $compile(angular.element('<merp map-name="myMap" default-controls="true"></merp>'))(scope.$new());
        scope.$digest();

        expect(myMap.isolateScope().mapName).toBe('myMap');
        expect(myMap.isolateScope().defaultControls).toBe(true);
    });

    it('should attempt to create a map with defaults', function () {
        expect(mapService.createMap).toHaveBeenCalledWith('default', false);
    });

    it('should attempt to create a map with passed values', function () {
        var myMap = $compile(angular.element('<merp map-name="myMap" default-controls="true"></merp>'))(scope.$new());
        scope.$digest();

        expect(mapService.createMap).toHaveBeenCalledWith('myMap', true);
    });
});