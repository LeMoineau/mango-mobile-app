import { UUID } from "../../../../../shared/src/types/primitives/Identifiers";

export type FavoritesListName = string;

export interface FavoritesList {
  name: FavoritesListName;
  intersiteMangaIds: UUID[];
}
