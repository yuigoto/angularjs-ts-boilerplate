/**
 * Dummy/Dummy.Component
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.component}
 * @since   0.0.1
 */
Dummy.component(
  "dummyItem", 
  {
    bindings: {
    },
    template: "<h3>DummyComponent</h3>",
    //templateUrl: "path/to/template.html",
    controller: DummyItem
  }
);

// DI
DummyItem.$inject = ["$http", "$log"];

/**
 * Controller.
 * 
 * @param {angular.IHttpService} $http 
 * @param {angular.ILogService} $log 
 */
function DummyItem(
  $http: angular.IHttpService,
  $log: angular.ILogService
): void {
  /**
   * Alias p/ controller.
   * 
   * @type {DummyItem}
   */
  const ctrl = this;
}
