/**
 * Global/Extends/Number
 * ----------------------------------------------------------------------
 * @since 0.0.1
 */
interface Number {
  /**
   * Shifts the current value towards `target` by `step`.
   *
   * Useful for simple acceleration/deceleration.
   *
   * Based on the `approach` script, by Matt Thorson, and present on 
   * his "Grandma Engine" for GameMaker.
   * 
   * @param {number} target 
   *     Value to move towards to 
   * @param {number} step 
   *     Steps to walk towards `target`
   * @returns {number} 
   */
  approach (target: number, step: number): number;

  /**
   * Returns the largest integer more than or equal than the current value.
   * 
   * @returns {number} 
   */
  ceil (): number;

  /**
   * Clamps the number between min and max.
   * 
   * @param {number} min 
   *     Min value allowed
   * @param {number} max 
   *     Max value allowed
   * @returns {number}
   */
  clamp (min: number, max: number): number;

  /**
   * Returns the largest integer less than or equal than the current value.
   * 
   * @returns {number}
   */
  floor(): number;

  /**
   * Alias for `clamp()`.
   * 
   * Clamps the number between min and max.
   * 
   * @param {number} min 
   *     Min value allowed
   * @param {number} max 
   *     Max value allowed
   * @returns {number}
   */
  limit (min: number, max: number): number;

  /**
   * Maps a number from a certain range to another range, proportionally, 
   * without clamping the value.
   *
   * Example use:
   * - If using `map(0, 10, 0, 100)` when the value's `7` will return `70`;
   * 
   * NOTE:
   * It's use is not limited, though, to ranges starting from 0, like the 
   * example above.
   * 
   * @param {number} istart 
   *     Input range start 
   * @param {number} istop 
   *     Input range end
   * @param {number} ostart 
   *     Output range start
   * @param {number} ostop 
   *     Output range end
   * @returns {number} 
   */
  map (istart: number, istop: number, ostart: number, ostop: number): number;

  /**
   * Rounds the number with the desired precision.
   * 
   * @param {number} precision 
   *     Precision to use when rounding
   * @returns {number}
   */
  round (precision: number): number;
  
  /**
   * Converts the current value from radians to degrees.
   * 
   * @returns {number} 
   */
  toDeg (): number;

  /**
   * Converts the current number to a hexadecimal string.
   * 
   * @returns {string}
   */
  toHex (): string;

  /**
   * Converts the current number to an integer.
   * 
   * @returns {number} 
   */
  toInt (): number;

  /**
   * Converts the current value from degrees to radians.
   * 
   * @returns {number}
   */
  toRad (): number;
}

// Methods
// ----------------------------------------------------------------------

Number.prototype.approach = function (target: number, step: number): number {
  return (this < target) 
    ? Math.min(this + step, target) 
    : Math.max(this - step, target);
};

Number.prototype.ceil = function (): number {
  return Math.ceil(this);
};

Number.prototype.clamp = function (min: number, max: number): number {
  return Math.min(max, Math.max(min, this));
};

Number.prototype.floor = function (): number {
  return Math.floor(this);
};

Number.prototype.limit = Number.prototype.clamp;

Number.prototype.map = function (
  istart: number,
  istop: number,
  ostart: number,
  ostop: number
): number {
  return ostart + (ostop - ostart) * ((this - istart) / (istop - istart));
};

Number.prototype.round = function (precision?: number): number {
  precision = Math.pow(10, precision || 0);
  return Math.round(this * precision) / precision;
};

Number.prototype.toDeg = function (): number {
  return (this * 180) / Math.PI;
};

Number.prototype.toHex = function (): string {
  return this.toString(16);
};

Number.prototype.toInt = function (): number {
  return (this | 0);
};

Number.prototype.toRad = function (): number {
  return (this / 180) * Math.PI;
};
