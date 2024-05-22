import { SourceName } from "../../../../../shared/src/types/primitives/Identifiers";
import { IntersiteMangaSearchSorting } from "../filter/IntersiteMangaSearchFilter";
import { ThemeName } from "../ThemeName";

export type SettingsValue = {
  theme: ThemeName;
  srcs: SourceName[];
  chapterReaderDisplayMode: ChapterReaderDisplayMode;
  chapterReaderHasHeader: boolean;
  chapterReaderHasFooter: boolean;
  autoScrapInSearch: boolean;
  autoScrapMangaInfos: boolean;
  autoScrapWhenImageNotFoundInCache: boolean;
  autoScrapWhenImageNotFoundInMangaInfos: boolean;
  autoScrapWhenImageNotFoundInSearch: boolean;
  defaultFavoritesListItemExpanded: boolean;
  notClosingAfterAddingMangaInList: boolean;
  saveMangaWhenAddingInFavorites: boolean;
  openMangaInfosOnMangaAvatarPress: boolean;
  defaultSortingInSearch: IntersiteMangaSearchSorting;
};

export type ChapterReaderDisplayMode = "stripe" | "singlePage";
