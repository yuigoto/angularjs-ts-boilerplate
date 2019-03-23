/**
 * Base/Base.Routes
 * ----------------------------------------------------------------------
 * @type {angular.IAngularBootstrapConfig}
 * @since 0.0.1
 */
Base.config([
  "$routeProvider",
  "$locationProvider",
  BaseRouteConfig
]);

/**
 * Callback para configurações de rota.
 * 
 * @param {angular.route.IRouteProvider} $routeProvider 
 *     `ngRroute` route provider
 * @param {angular.ILocationProvider} $locationProvider 
 *     AngularJS location provider
 */
function BaseRouteConfig(
  $routeProvider: angular.route.IRouteProvider,
  $locationProvider: angular.ILocationProvider
): void {
  $locationProvider.hashPrefix("");

  // Declare routes
  $routeProvider
    .when(
      "/",
      {
        templateUrl: "base.home.html"
      }
    )
    .when(
      "/page",
      {
        templateUrl: "base.page.html"
      }
    );
}
