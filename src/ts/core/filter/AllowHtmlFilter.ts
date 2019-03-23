/**
 * Core/AllowHtml.Filter
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.filter}
 * @since   0.0.1
 */
Core.filter("allowHtmlFilter", AllowHtmlFilter);

// DI
AllowHtmlFilter.$inject = ["$sce"];

/**
 * Permite que imprima strings contendo HTML, que o Angular normalmente 
 * bloqueia.
 * 
 * @param {angular.ISCEService} $sce 
 * @returns {Function} 
 */
function AllowHtmlFilter ($sce: angular.ISCEService): Function {
  /**
   * Apenas define o input como confiável.
   */
  return function (input: string): string {
    return $sce.trustAsHtml(input);
  }
}
