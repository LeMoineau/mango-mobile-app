import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  ChapterEndpoint,
  MangaFormattedName,
  SourceName,
  UUID,
} from "@shared/types/primitives/Identifiers";

export type RouteName =
  | "IntersiteMangaInfo"
  | "IntersiteMangaInfoDotsOptions"
  | "ChapterReader"
  | "App"
  | "IntersiteMangaSearch";

export type ParamListBase = {
  IntersiteMangaInfo: {
    intersiteMangaFormattedName: MangaFormattedName;
    action?: "forceMangaScraping" | "changeMangaSource";
  };
  IntersiteMangaInfoDotsOptions: { url: string } & (
    | {
        intersiteMangaId: UUID;
      }
    | {
        chapterId: UUID;
      }
  );
  ChapterReader: {
    src: SourceName;
    endpoint: ChapterEndpoint;
    storedMangaId?: UUID;
  };
  App: undefined;
  IntersiteMangaSearch: {
    query: string;
  };
};

export type useNavigationType = NavigationProp<ParamListBase>;
export type useRouteType<T extends RouteName> = RouteProp<ParamListBase, T>;
