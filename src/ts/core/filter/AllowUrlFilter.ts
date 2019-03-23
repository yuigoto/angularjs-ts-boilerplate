/**
 * Core/AllowUrl.Filter
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.filter}
 * @since   0.0.1
 */
Core.filter("allowUrlFilter", AllowUrlFilter);

// DI
AllowUrlFilter.$inject = ["$sce"];

/**
 * Permite que imprima strings contendo HTML, que o Angular normalmente 
 * bloqueia.
 * 
 * Resumindo: mesma coisa que `allowHtmlFilter` ¯\_(ツ)_/¯.
 * 
 * @param {angular.ISCEService} $sce 
 * @returns {Function} 
 */
function AllowUrlFilter ($sce: angular.ISCEService): Function {
  /**
   * Apenas define o input como confiável.
   */
  return function (input: string): string {
    return $sce.trustAsResourceUrl(input);
  }
}
