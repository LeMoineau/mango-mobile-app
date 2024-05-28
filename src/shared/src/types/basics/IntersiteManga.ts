import { Identified } from "../attributes/Identified";
import { ParentlessStoredManga } from "./Manga";
import {
  isMangaFormattedName,
  MangaFormattedName,
} from "../primitives/Identifiers";

export interface IntersiteMangaCore {
  formattedName: MangaFormattedName;
}

export interface IdentifiedIntersiteMangaCore
  extends IntersiteMangaCore,
    Identified {}

export interface IntersiteManga extends IdentifiedIntersiteMangaCore {
  mangas: ParentlessStoredManga[];
}

/**
 * TYPES FUNCTION
 */

export function isIntersiteManga(
  intersiteManga: any
): intersiteManga is IntersiteManga {
  return (
    Array.isArray(intersiteManga.mangas) &&
    isMangaFormattedName(intersiteManga.formattedName)
  );
}
