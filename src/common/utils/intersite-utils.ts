import { IntersiteField } from "@shared/types/intersite/IntersiteField";
import { SourceName } from "@shared/types/primitives/Identifiers";

export namespace IntersiteUtils {
  export function hasSource<T>(intersiteField: IntersiteField<T>): boolean {
    return Object.keys(intersiteField).length > 0;
  }

  export function getSources<T>(
    intersiteField: IntersiteField<T>
  ): SourceName[] {
    return Object.keys(intersiteField) as SourceName[];
  }
}
