import { isSourceName, SourceName } from "../primitives/Identifiers";
import { MangaNested, IdentifiedMangaNested } from "../attributes/MangaNested";
import { Identified } from "../attributes/Identified";
import { ChapterPage } from "./ChapterPage";

export interface ChapterCore {
  title: string;
  number: string;
  src: SourceName;
  endpoint: string;
  url: string;
  lang: string;
  image?: string;
  releaseDate?: string | Date;
}

export interface Chapter extends ChapterCore {}

export interface SourcelessChapter extends Omit<Chapter, "src"> {}

export interface IdentifiedChapter extends Chapter, Identified {}

export interface ScrapedChapter extends ChapterCore {
  manga: MangaNested;
}

export interface StoredChapter extends IdentifiedChapter {
  manga: IdentifiedMangaNested;
}

export interface PagedScrapedChapter extends ScrapedChapter {
  pages: ChapterPage[];
}

export interface MangaNestedIdentifiedChapter extends Chapter, Identified {
  manga: MangaNested;
}

/**
 * TYPES FUNCTION
 */

export function isScrapedChapter(chapter: any): chapter is ScrapedChapter {
  return (
    chapter &&
    chapter.manga &&
    chapter.title &&
    chapter.src &&
    isSourceName(chapter.src) &&
    chapter.endpoint &&
    chapter.url &&
    chapter.number &&
    chapter.lang
  );
}
