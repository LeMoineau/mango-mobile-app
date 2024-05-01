import { useCacheStore } from "../../../common/store/cache.store";
import {
  SourceName,
  UUID,
} from "../../../../../shared/src/types/primitives/Identifiers";
import useApi from "../../../../../shared/src/hooks/use-api";
import Config from "../../../common/config/Config";
import { IntersiteManga } from "../../../../../shared/src/types/basics/IntersiteManga";
import { useRef, useState } from "react";
import { useFavoritesStore } from "../../../common/store/favorites.store";
import { useSettingsStore } from "../../../common/store/settings.store";
import {
  ParentlessStoredManga,
  ScrapedManga,
} from "../../../../../shared/src/types/basics/Manga";

const useHome = () => {
  const { getAll } = useFavoritesStore();
  const { getIntersiteManga, saveIntersiteManga } = useCacheStore();
  const { fetch } = useApi(Config.getEnv().MANGO_BD_API_ENDPOINT);
  const { get } = useSettingsStore();
  const beingScrapingMangas = useRef(false);
  const [querySearch, setQuerySearch] = useState("");

  const fetchIntersiteManga = async (intersiteMangaId: UUID) => {
    const intersiteManga = await fetch<IntersiteManga>(
      `/intersiteMangas/${intersiteMangaId}`,
      {
        forceRefresh: true,
      }
    );
    if (!intersiteManga) {
      return;
    }
    await saveIntersiteManga(intersiteManga, { forceSave: true });
  };

  const _scrapeManga = async (
    manga: ParentlessStoredManga
  ): Promise<ScrapedManga | undefined> => {
    return await fetch<ScrapedManga>(
      `/srcs/${manga.src}/mangas/${manga.endpoint}`,
      {
        forceRefresh: true,
        config: {
          baseURL: Config.getEnv().MANGO_SCRAPER_API_ENDPOINT,
          params: { syncWithBD: true },
        },
      }
    );
  };

  const scrapeMangas = async (src: SourceName) => {
    if (
      beingScrapingMangas.current ||
      get("autoScrapWhenImageNotFoundInCache") !== true
    ) {
      return;
    }
    beingScrapingMangas.current = true;
    for (let favList of getAll()) {
      for (let intersiteMangaId of favList.intersiteMangaIds) {
        const intersiteManga = getIntersiteManga(intersiteMangaId);
        if (intersiteManga) {
          const manga = intersiteManga.mangas.find((m) => m.src === src);
          if (manga && (!manga.author || !manga.image)) {
            const scrapedManga = await _scrapeManga(manga);
            const updatedManga = { ...manga, ...scrapedManga, chapters: [] };
            const index = intersiteManga.mangas.findIndex(
              (m) => m.id === manga.id
            );
            if (index !== -1) {
              intersiteManga.mangas.splice(index, 1, updatedManga);
              await saveIntersiteManga(intersiteManga, { forceSave: true });
            }
          }
        }
      }
    }
  };

  const searchFavoritesLists = (query: string) => {
    setQuerySearch(query);
  };

  return {
    favorites: getAll().filter(
      (favList) =>
        querySearch.length <= 0 ||
        favList.name.toLowerCase().includes(querySearch.toLowerCase()) ||
        querySearch.toLowerCase().includes(favList.name.toLowerCase())
    ),
    fetchIntersiteManga,
    scrapeMangas,
    searchFavoritesLists,
  };
};

export default useHome;
