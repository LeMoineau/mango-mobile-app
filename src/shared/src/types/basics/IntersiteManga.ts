import { Identified } from "../attributes/Identified";
import { ParentlessStoredManga } from "./Manga";
import {
  isMangaFormattedName,
  MangaFormattedName,
  UUID,
} from "../primitives/Identifiers";

export interface IntersiteMangaCore {
  formattedName: MangaFormattedName;
}

export interface IdentifiedIntersiteMangaCore
  extends IntersiteMangaCore,
    Identified {}

export class IntersiteManga implements IdentifiedIntersiteMangaCore {
  formattedName: MangaFormattedName;
  id: UUID;
  mangas: ParentlessStoredManga[];

  constructor(
    id: UUID,
    formattedName: string,
    mangas: ParentlessStoredManga[]
  ) {
    this.id = id;
    this.formattedName = formattedName;
    this.mangas = mangas;
  }

  public get langs(): string[] {
    return [...new Set(this.mangas.map((m) => m.lang))];
  }
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
