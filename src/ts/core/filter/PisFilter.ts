/**
 * Core/Pis.Filter
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.filter}
 * @since   0.0.1
 */
Core.filter("pis", PisFilter);

// DI
PisFilter.$inject = [];

/**
 * Filtro para formatação de PIS.
 * 
 * @returns {Function} 
 */
function PisFilter (): Function {
  /**
   * Regex usada para replace.
   */
  const _rgx: RegExp = /([0-9]{3})([0-9]{5})([0-9]{2})([0-9]{1})/g;

  /**
   * Formata o PIS.
   * 
   * @param {string|number} input 
   *     Número a ser formatado 
   * @returns {string}
   */
  return function (input: string|number): string {
    if (!input || input === "") return "";
    if (typeof(input) === "number") input = input.toString();
    input = input.replace(/\D/g, "");
    if (input.length < 11) {
      while (input.length < 1) input = "0" + input;
    }
    return input.replace(_rgx, "$1.$2.$3-$4");
  };
}
