/**
 * Dummy/Dummy.Service
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.service}
 * @since   0.0.1
 */
Dummy.service("DummyService", DummyService);

// DI
DummyService.$inject = ["$scope", "$log"];

/**
 * Description.
 * 
 * @param {angular.IScope|any} $scope 
 * @param {angular.ILogService} $log 
 * @constructor
 */
function DummyService (
  $scope: angular.IScope|any,
  $log: angular.ILogService 
): void {
  /**
   * Referência a si próprio.
   * 
   * @type {DummyService}
   */
  const service = this;

  /**
   * Teste
   */
  service.testFunc = function (): void {
    $log.log("Hello from [DummyService]");
  };
}
