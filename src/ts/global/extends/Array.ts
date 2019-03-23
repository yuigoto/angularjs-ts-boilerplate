/**
 * Global/Extends/Array
 * ----------------------------------------------------------------------
 * @since 0.0.1
 */
interface Array<T> {
  /**
   * Removes an item from the array.
   * 
   * @param {any} item 
   *     Item to be removed from the array
   * @return {Array<any>}
   */
  erase (item: any): Array<any>;

  /**
   * Returns a random item from the array.
   * 
   * @return {any}
   */
  random (): any;

  /**
   * Shuffles an array.
   * 
   * @param {boolean} recursive 
   *     Activates recursion, in cases of nested arrays
   * @return {Array<any>}
   */
  shuffle (recursive?: boolean): Array<any>;
}

// Methods
// ----------------------------------------------------------------------

Array.prototype.erase = function (item: any): Array<any> {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === item) this.splice(i, 1);
  }
  return this;
};

Array.prototype.random = function (): any {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.shuffle = function (recursive?: boolean): Array<any> {
  let m: number = this.length,
      t: any,
      i: any;
  while (m > 0) {
    i = Math.floor(Math.random() * m--);
    t = this[m];
    this[m] = this[i];
    this[i] = t;

    if (Array.isArray(this[i]) && recursive === true) {
      this[i].shuffle(recursive);
    }
  }
  return this;
};
