/**
 * Base/Base.Home
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.controller}
 * @since   0.0.1
 */
Base.controller("BaseHomeController", BaseHomeController);

// DI
BaseHomeController.$inject = ["$scope", "$http", "$log"];

/**
 * Controller.
 * 
 * @param {angular.IScope|any} $scope 
 * @param {angular.IHttpService} $http 
 * @param {angular.ILogService} $log 
 */
function BaseHomeController (
  $scope: angular.IScope|any,
  $http: angular.IHttpService, 
  $log: angular.ILogService
): void {
  // Mensageiros
  // --------------------------------------------------------------------

  /**
   * Armazena mensagem de falha.
   *
   * @type {string}
   */
  $scope.messageFailure = "";

  /**
   * Armazena mensagem de sucesso.
   *
   * @type {string}
   */
  $scope.messageSuccess = "";

  /**
   * Armazena mensagem de alerta.
   *
   * @type {string}
   */
  $scope.messageWarning = "";

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao inicializar.
   */
  this.$onInit = function () {
    $log.log("[BaseHomeController] initialized.");
  };

  /**
   * Executa ao receber updates no `$scope`.
   */
  this.$doCheck = function () {
    console.log("[BaseHomeController] updated.");
  };

  // Etc...
  // --------------------------------------------------------------------
}
