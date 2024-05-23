import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  ChapterEndpoint,
  MangaFormattedName,
  SourceName,
  UUID,
} from "./../../../../../shared/src/types/primitives/Identifiers";
import { FavoritesListName } from "../favorites/FavoritesList";
import { NavigationDotsParams } from "./NavigationDotsParams";

export type RouteName =
  | "IntersiteMangaInfo"
  | "DotsOptions"
  | "ChapterReader"
  | "App"
  | "IntersiteMangaSearch"
  | "AddingInFavoritesList"
  | "FavoritesListInfos";

export type ParamListBase = {
  IntersiteMangaInfo: (
    | { intersiteMangaId: UUID }
    | { intersiteMangaFormattedName: MangaFormattedName }
  ) & {
    defaultSource?: SourceName;
    changeSource?: SourceName;
    forceScraping?: boolean;
  };
  DotsOptions: NavigationDotsParams;
  ChapterReader: (
    | {
        src: SourceName;
        endpoint: ChapterEndpoint;
      }
    | {
        chapterId: UUID;
      }
  ) & {
    storedMangaId?: UUID;
  };
  App: undefined;
  IntersiteMangaSearch: {
    query: string;
  };
  AddingInFavoritesList: {
    intersiteMangaId: UUID;
  };
  FavoritesListInfos: {
    favoritesListName: FavoritesListName;
  };
};

export type useNavigationType = NavigationProp<ParamListBase>;
export type useRouteType<T extends RouteName> = RouteProp<ParamListBase, T>;
