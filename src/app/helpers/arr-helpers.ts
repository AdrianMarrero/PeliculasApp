export class ArrHelpers {

  /**
   *
   * @param arr
   * @param item
   *
   * Remove Item from Array
   */
  static removeItemFromArr(arr: any, item: number) {
    var i = arr.indexOf(item);
    i !== -1 && arr.splice(i, 1);
  };

}
