export type MangaEndpoint = string;
export type ChapterEndpoint = string;
export type MangaFormattedName = string;
export type ChapterFormattedName = string;
export type FormattedNumber = string;
export type SourceName = string; //"mangaplus" | "mangasaki" | "sailmg";
export type UUID = string; //`${string}-${string}-${string}-${string}-${string}`;
export type Lang = "en" | "fr" | string;

/**
 * TYPES FUNCTIONS
 */

export function isUUID(str: any): str is UUID {
  return typeof str === "string";
}

export function isSourceName(str: any): str is SourceName {
  return typeof str === "string"; // [mangaplus", "mangasaki", "sailmg"].includes(str);
}

export function isMangaFormattedName(str: any): str is MangaFormattedName {
  return typeof str === "string";
}

export function isChapterFormattedName(str: any): str is ChapterFormattedName {
  return typeof str === "string";
}
