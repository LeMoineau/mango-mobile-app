import { Identified } from "../attributes/Identified";
import {
  IdentifiedIntersiteMangaNested,
  isIdentifiedIntersiteMangaNested,
} from "../attributes/MangaNested";
import { IdentifiedChapter } from "./Chapter";
import {
  ChapterFormattedName,
  isChapterFormattedName,
} from "../primitives/Identifiers";

export interface IntersiteChapterCore {
  formattedName: ChapterFormattedName;
}

export interface ParentlessIntersiteChapter
  extends IntersiteChapterCore,
    Identified {
  chapters: IdentifiedChapter[];
}

export interface IntersiteChapter extends ParentlessIntersiteChapter {
  intersiteManga: IdentifiedIntersiteMangaNested;
}

/**
 * TYPES FUNCTION
 */

export function isParentlessIntersiteChapter(
  intersiteChapter: any
): intersiteChapter is ParentlessIntersiteChapter {
  return (
    intersiteChapter &&
    Array.isArray(intersiteChapter.chapters) &&
    isChapterFormattedName(intersiteChapter.formattedName)
  );
}

export function isIntersiteChapter(
  intersiteChapter: any
): intersiteChapter is IntersiteChapter {
  return (
    intersiteChapter.intersiteManga &&
    isIdentifiedIntersiteMangaNested(intersiteChapter.intersiteManga) &&
    isParentlessIntersiteChapter(intersiteChapter)
  );
}
