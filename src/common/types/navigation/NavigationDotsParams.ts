import {
  isUUID,
  SourceName,
  UUID,
} from "../../../../../shared/src/types/primitives/Identifiers";
import { FavoritesListName } from "../favorites/FavoritesList";

export type NavigationDotsParams =
  | IntersiteMangaInfosDotsParams
  | ChapterItemDotsParams
  | FavoritesListItemDotsParams;

export type IntersiteMangaInfosDotsParams = {
  url: string;
  intersiteMangaId: UUID;
  availablesSources: SourceName[];
  currentSource: SourceName;
};

export type ChapterItemDotsParams = {
  url: string;
  chapterId: UUID;
};

export type FavoritesListItemDotsParams = {
  favoritesListName: FavoritesListName;
  addIntersiteMangaIn?: UUID;
  canOpenListInfos?: boolean;
  goBackOnRename?: boolean;
  goBackOnDelete?: boolean;
};

export type IntersiteMangaInFavoritesListDotsParams = {
  favoritesListName: FavoritesListName;
  intersiteMangaId: UUID;
};

/**
 * TYPES FUNCTION
 */
export const isIntersiteMangaDotsOptions = (
  param: any
): param is IntersiteMangaInfosDotsParams => {
  return (
    param && isUUID(param.intersiteMangaId) && typeof param.url === "string"
  );
};

export const isChapterDotsOptions = (
  param: any
): param is ChapterItemDotsParams => {
  return param && isUUID(param.chapterId) && typeof param.url === "string";
};

export const isFavoritesListItemDotsParams = (
  param: any
): param is FavoritesListItemDotsParams => {
  return (
    param &&
    typeof param.favoritesListName === "string" &&
    param.intersiteMangaId === undefined
  );
};

export const isIntersiteMangaInFavoritesListDotsParams = (
  param: any
): param is IntersiteMangaInFavoritesListDotsParams => {
  return (
    param &&
    typeof param.favoritesListName === "string" &&
    isUUID(param.intersiteMangaId)
  );
};
