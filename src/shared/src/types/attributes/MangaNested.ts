import {
  isMangaFormattedName,
  MangaEndpoint,
  MangaFormattedName,
} from "../primitives/Identifiers";
import { Identified, isIdentified } from "./Identified";

export interface IntersiteMangaNested {
  formattedName: MangaFormattedName;
}

export interface IdentifiedIntersiteMangaNested
  extends IntersiteMangaNested,
    Identified {}

export interface MangaNested {
  endpoint: MangaEndpoint;
  title: string;
  url: string;
}

export interface IdentifiedMangaNested extends MangaNested, Identified {}

/**
 * TYPES FUNCTION
 */

export function isMangaNested(manga: any): manga is MangaNested {
  return (
    manga &&
    typeof manga.title === "string" &&
    typeof manga.endpoint === "string" &&
    typeof manga.url === "string"
  );
}

export function isIdentifiedMangaNested(
  manga: any
): manga is IdentifiedMangaNested {
  return isIdentified(manga) && isMangaNested(manga);
}

export function isIdentifiedIntersiteMangaNested(
  manga: any
): manga is IdentifiedIntersiteMangaNested {
  return (
    manga &&
    manga.formattedName &&
    isMangaFormattedName(manga.formattedName) &&
    isIdentified(manga)
  );
}
