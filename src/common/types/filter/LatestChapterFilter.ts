import {
  Lang,
  SourceName,
} from "../../../shared/src/types/primitives/Identifiers";
import { FavoritesListName } from "../favorites/FavoritesList";

export type LatestChapterDisplay = "list" | "grid" | "by src";

/**
 * Si attribut undefined, alors pas de changement,
 * sinon valeurs qui ont changées
 */
export default interface LatestChapterFilter {
  srcs?: SourceName[];
  langs?: Lang[];
  favoritesLists?: FavoritesListName[];
  display?: LatestChapterDisplay;
}
