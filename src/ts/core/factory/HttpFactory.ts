/**
 * Core/Http.Factory
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.factory}
 * @since   0.0.1
 */
Core.factory("HttpFactory", HttpFactory);

// DI
HttpFactory.$inject = ["$http", "$log"];

/**
 * Gerencia requests HTTP básicos.
 * 
 * @param {angular.IHttpService} $http 
 *     Serviço de requests HTTP nativo do AngularJS
 * @param {angular.ILogService} $log 
 *     Serviço de logs nativo do AngularJS
 * @returns {any}
 * @constructor 
 */
function HttpFactory (
  $http: angular.IHttpService, 
  $log: angular.ILogService
): any {
  /**
   * Callback usado para definir mensagem e nomes de exceptions.
   * 
   * @param {string} message 
   *     Mensagem para exception 
   * @param {string} name 
   *     Título da exception
   * @constructor
   */
  function FactoryException (message: string, name?: string): void {
    this.message = message;
    this.name = name || "FactoryException";
  }

  FactoryException.prototype = Object.create(Error.prototype);
  FactoryException.prototype.constructor = FactoryException;

  /**
   * Callback de sucesso para request HTTP.
   * 
   * @param {Object} response 
   *     Objeto de resposta HTTP
   * @returns {*}
   * @private 
   */
  const _onRequestSuccess = function (response) {
    return response.data;
  };

  /**
   * Callback de falha para request HTTP.
   * 
   * @param {Object} response 
   *     Objeto de resposta HTTP
   * @returns {*}
   * @private 
   */
  const _onRequestFailure = function (response) {
    throw new FactoryException(
      "There was a problem with your request: " + response.data
    );
  };

  /**
   * Executa request usando $http, retorna uma promise.
   * @param {Object} params 
   *     Parâmetros para request
   * @param {any} successCb 
   *     Callback de sucesso 
   * @param {any} failureCb 
   *     Callback de falha
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   * @private
   */
  const _execute = function(params, successCb?: any, failureCb?: any) {
    return $http(params)
      .then(
        successCb || _onRequestSuccess,
        failureCb || _onRequestFailure
      );
  };

  return {
    execute: _execute
  }
}
