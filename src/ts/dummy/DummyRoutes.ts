/**
 * Dummy/Dummy.Routes
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.config}
 * @since   0.0.1
 */
Dummy.config([
  "$routeProvider",
  "$locationProvider",
  function (
    $routeProvider: angular.route.IRouteProvider,
    $locationProvider: angular.ILocationProvider
  ) {
    $locationProvider.hashPrefix("");

    $routeProvider
      .when(
        "/dummy",
        {
          redirectTo: "/",
          // templateUrl: "path/to/template.html"
        }
      );
  }
]);
