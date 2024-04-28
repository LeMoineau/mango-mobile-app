import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  ChapterEndpoint,
  MangaFormattedName,
  SourceName,
  UUID,
} from "@shared/types/primitives/Identifiers";
import { FavoritesListName } from "../favorites/FavoritesList";

export type RouteName =
  | "IntersiteMangaInfo"
  | "DotsOptions"
  | "ChapterReader"
  | "App"
  | "IntersiteMangaSearch"
  | "AddingInFavoritesList";

export type ParamListBase = {
  IntersiteMangaInfo: {
    intersiteMangaFormattedName: MangaFormattedName;
    action?: "forceMangaScraping" | "changeMangaSource";
  };
  DotsOptions:
    | {
        url: string;
        intersiteMangaId: UUID;
      }
    | {
        url: string;
        chapterId: UUID;
      }
    | {
        favoritesListName: FavoritesListName;
      };
  ChapterReader: {
    src: SourceName;
    endpoint: ChapterEndpoint;
    storedMangaId?: UUID;
  };
  App: undefined;
  IntersiteMangaSearch: {
    query: string;
  };
  AddingInFavoritesList: {
    intersiteMangaId: UUID;
  };
};

export type useNavigationType = NavigationProp<ParamListBase>;
export type useRouteType<T extends RouteName> = RouteProp<ParamListBase, T>;
