export type SettingsKey =
  | "theme"
  | "srcs"
  | ChapterReaderSettingsKey
  | ScrapingSettingsKey
  | FavoritesSettingsKey
  | CacheSettingsKey
  | SearchingSettingsKey;

export type ChapterReaderSettingsKey =
  | "chapterReaderDisplayMode"
  | "chapterReaderHasHeader"
  | "chapterReaderHasFooter";

export type ScrapingSettingsKey =
  | "autoScrapMangaInfos"
  | "autoScrapWhenImageNotFoundInMangaInfos";

export type FavoritesSettingsKey =
  | "defaultFavoritesListItemExpanded"
  | "notClosingAfterAddingMangaInList"
  | "openMangaInfosOnMangaAvatarPress";

export type CacheSettingsKey =
  | "saveMangaWhenAddingInFavorites"
  | "autoScrapWhenImageNotFoundInCache";

export type SearchingSettingsKey =
  | "defaultSortingInSearch"
  | "autoScrapWhenImageNotFoundInSearch"
  | "autoScrapInSearch";
