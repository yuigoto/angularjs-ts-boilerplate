/**
 * Core/Cpf.Filter
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.filter}
 * @since   0.0.1
 */
Core.filter("cpf", CpfFilter);

// DI
CpfFilter.$inject = [];

/**
 * Filtro para formatação de CPF.
 * 
 * @returns {Function} 
 */
function CpfFilter (): Function {
  /**
   * Regex usada para replace.
   */
  const _rgx: RegExp = /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/g;

  /**
   * Formata o CPF.
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
