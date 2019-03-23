/**
 * Dummy/Dummy.Factory
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.factory}
 * @since   0.0.1
 */
Dummy.factory("DummyFactory", DummyFactory);

// DI
DummyFactory.$inject = ["$log"];

/**
 * DummyFactory.
 * 
 * @param {angular.ILogService} $log 
 * @returns {any}
 * @constructor 
 */
function DummyFactory (
  $log: angular.ILogService
): any {
  /**
   * Hello?
   */
  const _test = function () {
    $log.log("Hello from the [DummyFactory]");
  };

  return {
    hello: "hello",
    test: _test
  }
}
