/**
 * Global/Extends/Function
 * ----------------------------------------------------------------------
 * @since   0.0.1
 */
interface Function {
  /**
   * `Funtion.prototype.bind` polyfill.
   *
   * Binds a method/function to the desired scope.
   * 
   * @param {any} _this 
   *     Object whose scope the function will be bound to 
   * @return {any} 
   */
  bind (_this: any): any;
}

// Methods
// ----------------------------------------------------------------------

Function.prototype.bind = Function.prototype.bind || function (_this: any): any {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  let arrayArgs: any = Array.prototype.slice.call(arguments, 1),
      funcToBind: any = this,
      funcNewObjPrototype: any = function () {},
      funcBound: any = function () {
        return funcToBind.apply(
          (this instanceof funcNewObjPrototype && _this ? this : _this),
          arrayArgs.concat(Array.prototype.slice.call(arguments))
        );
      };

  funcNewObjPrototype = this.prototype;
  funcBound.prototype = new funcNewObjPrototype();

  return funcBound;
};
