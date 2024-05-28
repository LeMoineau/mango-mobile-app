export type MangaEndpoint = string;
export type ChapterEndpoint = string;
export type MangaFormattedName = string;
export type ChapterFormattedName = string;
export type FormattedNumber = string;
export type SourceName = "mangaplus" | "mangasaki";
export type UUID = string; //`${string}-${string}-${string}-${string}-${string}`;

/**
 * TYPES FUNCTIONS
 */

export function isUUID(str: any): str is UUID {
  return typeof str === "string";
}

export function isSourceName(str: any): str is SourceName {
  return str === "mangaplus" || str === "mangasaki";
}

export function isMangaFormattedName(str: any): str is MangaFormattedName {
  return typeof str === "string";
}

export function isChapterFormattedName(str: any): str is ChapterFormattedName {
  return typeof str === "string";
}
