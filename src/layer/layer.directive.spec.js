describe('layer directive', function() {
    var $compile, layer, layerController, scope, sourceService, layerService;

    beforeEach(inject(function($rootScope, _$compile_, _sourceService_, _layerService_, $q) {

        var defferedSource = $q.defer();
        defferedSource.resolve(new ol.source.OSM());
        sourceService = _sourceService_;
        spyOn(sourceService, 'getSource').and.returnValue(defferedSource.promise);

        $compile = _$compile_;
        layerService = _layerService_;
        spyOn(layerService, 'addLayer');

        scope = $rootScope.$new();

        layer = $compile(angular.element('<m-layer layer-name="myLayer" source-name="mySource"></m-layer>'))(scope);
        scope.$digest();

        layerController = layer.controller('mLayer');
    }));

    it('should attempt to add a named layer', function () {
        expect(layerService.addLayer).toHaveBeenCalledTimes(1);
        expect(layerService.addLayer.calls.mostRecent().args[0]).toMatch('myLayer');
    });

    it('should not attempt to add a layer with no name', function () {
        $compile(angular.element('<m-layer></m-layer>'))(scope);
        scope.$digest();

        expect(layerService.addLayer).toHaveBeenCalledTimes(1); // called once from the 'beforeEach'
    });


    it('should request a named source', function () {
        expect(sourceService.getSource).toHaveBeenCalledTimes(1);
        expect(sourceService.getSource).toHaveBeenCalledWith('mySource');
    });
});