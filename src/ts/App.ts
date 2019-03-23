/**
 * App
 * ----------------------------------------------------------------------
 * Defines the main Angular application module.
 * 
 * Inject all other modules from folders into this one.
 * 
 * @type {angular.IModule}
 * @since 0.0.1
 */
const App: angular.IModule = angular.module(
  "app",
  [
    "ngRoute",
    "base",
    "core"
  ]
);
