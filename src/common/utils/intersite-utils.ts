import { IntersiteField } from "../types/intersite/IntersiteField";
import { SourceName } from "../types/primitives/Ids";

export namespace IntersiteUtils {
  export function hasSource<T>(intersiteField: IntersiteField<T>): boolean {
    return Object.keys(intersiteField).length > 0;
  }

  export function getSources<T>(
    intersiteField: IntersiteField<T>
  ): SourceName[] {
    return Object.keys(intersiteField);
  }
}
