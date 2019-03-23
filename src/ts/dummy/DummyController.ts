/**
 * Dummy/Dummy.Controller
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.controller}
 * @since   0.0.1
 */
Dummy.controller("DummyController", DummyController);

// DI
DummyController.$inject = ["$scope", "$http", "$log"];

/**
 * Controller.
 * 
 * @param {angular.IScope|any} $scope 
 * @param {angular.IHttpService} $http 
 * @param {angular.ILogService} $log 
 */
function DummyController (
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
    $log.log("[Dummy] initialized.");
  };

  /**
   * Executa ao receber updates no `$scope`.
   */
  this.$doCheck = function () {
    console.log("[Dummy] updated.");
  };

  // Etc...
  // --------------------------------------------------------------------
}
