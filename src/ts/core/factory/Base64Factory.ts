/**
 * Core/Base64.Factory
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.factory}
 * @since   0.0.1
 */
Core.factory("Base64Factory", Base64Factory);

// DI
Base64Factory.$inject = ["$log"];

/**
 * Encoder/decoder de strings base64.
 * 
 * @param {angular.ILogService} $log 
 *     Serviço de logs nativo do AngularJS
 * @returns {any}
 * @constructor 
 */
function Base64Factory (
  $log: angular.ILogService
): any {
  /**
   * RegExp usada ao converter para base64.
   * 
   * @type {RegExp}
   * @private 
   */
  const _pattern: RegExp = /%([0-9A-F]{2})/g;

  /**
   * Callback para `replace`, quando convertendo para base64, converte um 
   * número unicode em um caractere.
   * 
   * @param {string} match
   *    Substring com correspondência em replace
   * @param {string} p1
   *    Primeiro parâmetro na regex de `replace()`.
   * @returns {String}
   * @private
   */
  const _unicodeChar = function (match: string, p1: string): string {
    return String.fromCharCode(parseInt("0x" + p1));
  };

  /**
   * Converte um caractere em uma string URL-safe.
   *
   * @param {string} char 
   *     Caractere a ser convertido
   * @returns {string}
   * @private
   */
  const _urlEncodedChar = function(char: string): string {
    return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
  };

  /**
   * Codifica uma string base64.
   *
   * @param {String} input 
   *     String a ser convertida
   * @returns {string}
   * @private
   */
  const _base64Encode = function(input: string): string {
    return btoa(
      encodeURIComponent(input).replace(_pattern, _unicodeChar)
    );
  };

  /**
   * Decodifica uma string base64.
   *
   * @param {string} input
   *     String a ser decodificada
   * @returns {string}
   * @private
   */
  const _base64Decode = function(input: string): string {
    return decodeURIComponent(
      atob(input).split("").map(_urlEncodedChar).join("")
    );
  };

  return {
    decode: _base64Decode,
    encode: _base64Encode
  };
}
