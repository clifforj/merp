describe('layer directive', function() {
    var $compile, layer, layerController, scope, sourceService, layerService, deferredSource, $q;

    beforeEach(inject(function($rootScope, _$compile_, _sourceService_, _layerService_, _$q_) {

        defferedSource = _$q_.defer();
        sourceService = _sourceService_;
        spyOn(sourceService, 'getSource').and.returnValue(defferedSource.promise);

        $q = _$q_;
        $compile = _$compile_;
        layerService = _layerService_;
        spyOn(layerService, 'addLayer');

        scope = $rootScope.$new();

        layer = $compile(angular.element('<m-layer layer-name="myLayer" layer-type="tile" source-name="mySource"></m-layer>'))(scope);
        scope.$digest();

        layerController = layer.controller('mLayer');
    }));

    it('should attempt to add a named layer', function () {
        defferedSource.resolve(new ol.source.OSM());
        scope.$digest();
        expect(layerService.addLayer).toHaveBeenCalledTimes(1);
        expect(layerService.addLayer.calls.mostRecent().args[0]).toMatch('myLayer');
    });

    it('should also create vector layers', function () {
        $compile(angular.element('<m-layer layer-name="myLayer" layer-type="vector" source-name="mySource"></m-layer>'))(scope);
        defferedSource.resolve(new ol.source.Vector());
        scope.$digest();
        expect(layerService.addLayer.calls.mostRecent().args[1] instanceof ol.layer.Vector).toBeTruthy();
    });

    it('should not attempt to add a layer with no name', function () {
        defferedSource.resolve(new ol.source.OSM());
        $compile(angular.element('<m-layer></m-layer>'))(scope.$new());
        scope.$digest();

        expect(layerService.addLayer).toHaveBeenCalledTimes(1); // called once from the 'beforeEach'
    });

    it('should request a named source', function () {
        defferedSource.resolve(new ol.source.OSM());
        scope.$digest();
        expect(sourceService.getSource).toHaveBeenCalledTimes(1);
        expect(sourceService.getSource).toHaveBeenCalledWith('mySource');
    });

    it('shouldn\'t request a source if there isn\'t one', function () {
        defferedSource.resolve(new ol.source.OSM());
        $compile(angular.element('<m-layer layer-name="floop"></m-layer>'))(scope.$new());
        scope.$digest();
        expect(sourceService.getSource).toHaveBeenCalledTimes(1); // called once from the 'beforeEach'
    });
});