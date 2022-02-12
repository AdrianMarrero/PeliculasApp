import { Actor } from "../interfaces/movie-response";

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

  /**
   *
   * @param arrActors
   *
   * Concat name Actors
   */
  static concatActorName(arrActors: Actor[]) {
    arrActors.map(option => {
      const newPropsObj = {
        nombre_completo: option.first_name + ' ' + option.last_name
      };
      return Object.assign(option, newPropsObj);
    });
  }



}
