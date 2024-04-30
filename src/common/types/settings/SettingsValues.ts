import { SourceName } from "../../../../../shared/src/types/primitives/Identifiers";
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
};

export type ChapterReaderDisplayMode = "stripe" | "singlePage";
