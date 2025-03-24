import { Identified } from "../attributes/Identified";
import { SourcelessChapter } from "./Chapter";
import { IdentifiedIntersiteMangaCore } from "./IntersiteManga";
import { isSourceName, SourceName } from "../primitives/Identifiers";

export interface MangaCore {
  endpoint: string;
  src: SourceName;
  title: string;
  url: string;
  lang: string;
}

export interface Manga extends MangaCore {
  author?: string;
  image?: string;
}

export interface ScrapedManga extends MangaCore {
  author: string;
  image: string;
  chapters?: SourcelessChapter[];
}

export interface IdentifiedMangaCore extends MangaCore, Identified {}

export interface ParentlessStoredManga extends Manga, Identified {}

export interface StoredManga extends ParentlessStoredManga {
  intersiteManga: IdentifiedIntersiteMangaCore;
}

/**
 * TYPES FUNCTION
 */

export function isManga(manga: any): manga is Manga {
  return (
    manga &&
    manga.endpoint &&
    isSourceName(manga.src) &&
    manga.title &&
    manga.url &&
    manga.lang
  );
}
