import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  ChapterId,
  FormattedName,
  MangaId,
  SourceName,
} from "@shared/types/primitives/id";

export type RouteName = "MangaInfo" | "ChapterReader" | "App";

export type ParamListBase = {
  MangaInfo: {
    formattedName?: FormattedName;
    src?: SourceName;
    mangaId?: MangaId;
  };
  ChapterReader: {
    src: SourceName;
    mangaId: MangaId;
    chapterId: ChapterId;
  };
  App: undefined;
};

export type useNavigationType = NavigationProp<ParamListBase>;
export type useRouteType<T extends RouteName> = RouteProp<ParamListBase, T>;
