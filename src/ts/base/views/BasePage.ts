/**
 * Base/Base.Page
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.controller}
 * @since   0.0.1
 */
Base.controller("BasePageController", BasePageController);

// DI
BasePageController.$inject = [
  "$scope", 
  "$http", 
  "$log", 
  "$timeout", 
  "HttpFactory",
  "Base64Factory"
];

/**
 * Controller.
 * 
 * @param {angular.IScope|any} $scope 
 * @param {angular.IHttpService} $http 
 * @param {angular.ILogService} $log 
 * @param {angular.ITimeoutService} $timeout 
 * @param {any} HttpFactory
 * @param {any} Base64Factory
 */
function BasePageController (
  $scope: angular.IScope|any,
  $http: angular.IHttpService, 
  $log: angular.ILogService,
  $timeout: angular.ITimeoutService,
  HttpFactory: any,
  Base64Factory: any
): void {
  // Mensageiros
  // --------------------------------------------------------------------

  /**
   * Scope loading status.
   * 
   * @type {boolean}
   */
  $scope.loaded = {
    status: false
  };
  
  $scope.posts = [];

  $scope.error = false;

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
    $log.log("[BasePageController] initialized.");

    $scope.simulateLoad();
  };

  /**
   * Executa ao receber updates no `$scope`.
   */
  this.$doCheck = function () {
    $log.log("[BasePageController] updated.");
  };

  // Etc...
  // --------------------------------------------------------------------

  $scope.loadedSimulated = function () {
    $scope.loaded.status = true;
  };

  $scope.simulateLoad = function () {
    $scope.error = false;
    $scope.loaded.status = false;

    let demo = HttpFactory.execute({
          method: "GET",
          url: "https://jsonplaceholder.typicode.com/posts"
        }).then(function (e) {
          $scope.posts = e;
          $scope.loaded.status = true;
        }).catch(function(e) {
          $scope.error = true;
          $scope.loaded.status = true;
        });
  };
}
