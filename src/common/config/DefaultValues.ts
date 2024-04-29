import { Cache } from "../types/cache/Cache";
import { Favorites } from "../types/favorites/Favorites";
import { Settings } from "../types/settings/Settings";

export namespace DefaultValues {
  export const SETTINGS: Settings = {
    theme: "light",
    srcs: ["mangaplus", "mangasaki"],
    chapterReaderDisplayMode: "singlePage",
    chapterReaderHasHeader: true,
    chapterReaderHasFooter: true,
  };
  export const READER_HEIGHT_RATE_UPDATE = 0.7;
  export const LIKE_FAVORITES_LIST_NAME = "Liked Mangas";
  export const FAVORITES: Favorites = {
    lists: [
      {
        name: LIKE_FAVORITES_LIST_NAME,
        intersiteMangaIds: [],
      },
    ],
  };
  export const CACHE: Cache = {
    intersiteMangas: [],
  };
}
