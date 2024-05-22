import { useRef, useState } from "react";
import { IntersiteManga } from "../../../../../shared/src/types/basics/IntersiteManga";
import Config from "../../../common/config/Config";
import useResponsePageApi from "../../../common/hooks/use-response-page-api";
import useApi from "../../../../../shared/src/hooks/use-api";
import { useSettingsStore } from "../../../common/store/settings.store";
import {
  ParentlessStoredManga,
  ScrapedManga,
} from "../../../../../shared/src/types/basics/Manga";
import useMoreTrustedValue from "../../../common/hooks/use-more-trusted-value";
import IntersiteMangaSearchFilter, {
  IntersiteMangaSearchSorting,
} from "../../../common/types/filter/IntersiteMangaSearchFilter";

const useIntersiteMangaSearch = () => {
  const {
    elements: intersiteMangas,
    fullyLoaded,
    fetch,
    reset,
  } = useResponsePageApi<IntersiteManga>(Config.getEnv().MANGO_BD_API_ENDPOINT);
  const { fetch: _fetchScrapingApi, post: _postScrapingApi } = useApi(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );
  const previousQuery = useRef<string>();
  const [loading, setLoading] = useState(false);
  const { get } = useSettingsStore();
  const { getMoreTrustedManga } = useMoreTrustedValue();
  const [sorting, setSorting] = useState(
    get("defaultSortingInSearch") as IntersiteMangaSearchSorting
  );

  const fetchNewQuery = async (query: string) => {
    previousQuery.current = query.trim();
    setLoading(true);
    reset();
    if (get("autoScrapInSearch") === true) {
      await _postScrapingApi("/mangas/search", {
        query: previousQuery.current,
        syncWithBD: true,
      });
    }
    const res = await fetch("/intersiteMangas", {
      params: { mangaTitle: previousQuery.current },
      resetElementsIfSuceed: true,
      page: 1,
    });
    if (get("autoScrapWhenImageNotFoundInSearch") && res) {
      let hasScrap = false;
      for (let intersiteManga of res.elements) {
        const manga = getMoreTrustedManga(intersiteManga);
        if (manga && (!manga.author || !manga.image)) {
          await _scrapeManga(manga);
          hasScrap = true;
        }
      }
      if (hasScrap) {
        await fetch("/intersiteMangas", {
          params: { mangaTitle: previousQuery.current },
          resetElementsIfSuceed: true,
          page: 1,
        });
      }
    }
    setLoading(false);
  };

  const fetchQuery = async () => {
    if (!previousQuery.current) return;
    setLoading(true);
    await fetch("/intersiteMangas", {
      params: { mangaTitle: previousQuery.current },
    });
    setLoading(false);
  };

  const _scrapeManga = async (manga: ParentlessStoredManga) => {
    await _fetchScrapingApi<ScrapedManga>(
      `/srcs/${manga.src}/mangas/${manga.endpoint}`,
      {
        forceRefresh: true,
        config: {
          params: { syncWithBD: true },
        },
      }
    );
  };

  const changeSorting = (sort: IntersiteMangaSearchSorting) => {
    if (sort === sorting) return;
    setSorting(sort);
  };

  return {
    intersiteMangas,
    fullyLoaded,
    currentQuery: previousQuery.current,
    loading,
    sorting,
    fetchNewQuery,
    fetchQuery,
    changeSorting,
  };
};

export default useIntersiteMangaSearch;
