/**
 * Global/Extends/Object
 * ----------------------------------------------------------------------
 * Global interface for Object, so we can extend it.
 * 
 * @since 0.0.1
 */
interface Object {
  /**
   * Provides a polyfill for `Object.assign`.
   * @param  {Object[]} ...objects 
   *     Arguments list, separated by commas
   * @return {Object} 
   */
  assign(...objects: Object[]): Object;
}
