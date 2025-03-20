import { Identified } from "../attributes/Identified";
import {
  IdentifiedIntersiteMangaNested,
  isIdentifiedIntersiteMangaNested,
} from "../attributes/MangaNested";
import { IdentifiedChapter } from "./Chapter";
import {
  ChapterFormattedName,
  isChapterFormattedName,
  UUID,
} from "../primitives/Identifiers";

export interface IntersiteChapterCore {
  formattedName: ChapterFormattedName;
}

export interface ParentlessIntersiteChapter
  extends IntersiteChapterCore,
    Identified {
  chapters: IdentifiedChapter[];
}

export class IntersiteChapter implements ParentlessIntersiteChapter {
  id: UUID;
  formattedName: ChapterFormattedName;
  intersiteManga: IdentifiedIntersiteMangaNested;
  chapters: IdentifiedChapter[];

  constructor(
    id: UUID,
    formattedName: ChapterFormattedName,
    intersiteManga: IdentifiedIntersiteMangaNested,
    chapters: IdentifiedChapter[]
  ) {
    this.id = id;
    this.formattedName = formattedName;
    this.intersiteManga = intersiteManga;
    this.chapters = chapters;
  }

  public get langs(): string[] {
    return [...new Set(this.chapters.map((c) => c.lang))];
  }
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
