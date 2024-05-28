import { JsonObject } from "@shared/types/primitives/jsonObject";

export namespace ObjectUtils {
  export async function forEachKeyInObject(
    object: JsonObject,
    callback: (key: string, value: any) => void | Promise<void>
  ): Promise<void> {
    for (let key of Object.keys(object)) {
      await callback(key, object[key]);
    }
  }
}
