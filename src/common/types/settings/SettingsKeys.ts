export type SettingsKey =
  | "theme"
  | "srcs"
  | ChapterReaderSettingsKey
  | ScrapingSettingsKey
  | FavoritesSettingsKey
  | CacheSettingsKey;

export type ChapterReaderSettingsKey =
  | "chapterReaderDisplayMode"
  | "chapterReaderHasHeader"
  | "chapterReaderHasFooter";

export type ScrapingSettingsKey =
  | "autoScrapMangaInfos"
  | "autoScrapWhenImageNotFoundInMangaInfos"
  | "autoScrapWhenImageNotFoundInSearch"
  | "autoScrapInSearch";

export type FavoritesSettingsKey =
  | "defaultFavoritesListItemExpanded"
  | "notClosingAfterAddingMangaInList"
  | "openMangaInfosOnMangaAvatarPress";

export type CacheSettingsKey =
  | "saveMangaWhenAddingInFavorites"
  | "autoScrapWhenImageNotFoundInCache";
