/**
 * Dummy/Dummy.Directive
 * ----------------------------------------------------------------------
 * @type    {angular.IModule.directive}
 * @since   0.0.1
 */
Dummy.directive(
  "dummyDirective", 
  function (): object {
    return {
      restrict: "A",
      scope: {
        params: "="
      },
      controller: DummyDirective,
      link: DummyDirectiveLink,
      template: "<h4>Directive</h4>",
      //templateUrl: "path/to/template.html"
    };
  }
);

/**
 * Link function.
 * 
 * @param {angular.IScope|any} scope 
 * @param {angular.IRootElementService} element 
 * @param {object|any} attrs 
 * @param {angular.IDirectiveController} controller 
 * @param {angular.ITranscludeFunction} transcludeFn 
 */
function DummyDirectiveLink (
  scope: angular.IScope|any,
  element: angular.IRootElementService,
  attrs: object|any,
  controller?: angular.IDirectiveController|any,
  transcludeFn?: angular.ITranscludeFunction|any
): void {
}

// DI
DummyDirective.$inject = ["$scope"];

/**
 * Controller.
 * 
 * @param {angular.IScope|any} $scope 
 * @constructor
 */
function DummyDirective ($scope: angular.IScope|any) {
}
