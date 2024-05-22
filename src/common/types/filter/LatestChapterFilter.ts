import { SourceName } from "../../../../../shared/src/types/primitives/Identifiers";
import { FavoritesListName } from "../favorites/FavoritesList";

export default interface LatestChapterFilter {
  srcs?: SourceName[];
  favoritesLists?: FavoritesListName[];
}
