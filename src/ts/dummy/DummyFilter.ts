/**
 * Dummy/Dummy.Filter
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.filter}
 * @since   0.0.1
 */
Dummy.filter("dummyFilter", DummyFilter);

// DI
DummyFilter.$inject = ["$log"];

/**
 * Filter function.
 * 
 * @param {angular.ILogService} $log 
 * @returns {Function}
 */
function DummyFilter ($log: angular.ILogService): Function {
  // Faça a mágica aqui

  /**
   * Retorne aqui.
   */
  return function (input: any): any {
    $log.log("Hello, from [DummyFilter]");

    return input;
  }
}