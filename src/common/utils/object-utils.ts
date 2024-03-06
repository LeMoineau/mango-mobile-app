import { JsonObject } from "../types/primitives/JsonObject";

export namespace ObjectUtils {
  export function equals(obj1: JsonObject, obj2: JsonObject): boolean {
    for (let k in obj1) {
      if (obj2[k] !== obj1[k]) return false;
    }
    return true;
  }
}
