import { IntersiteField } from "../types/intersite/IntersiteField";
import { SourceName } from "../types/primitives/Ids";

export namespace IntersiteUtils {
  export function getMoreTrustedSrcOfIntersiteField<T>(
    intersiteField: IntersiteField<T>
  ): [SourceName, T] | [] {
    return [];
  }
}
