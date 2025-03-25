import { useRef, useState } from "react";
import { StoredChapter } from "../../../shared/src/types/basics/Chapter";
import Config from "../../../common/config/Config";
import useResponsePageApi from "../../../common/hooks/use-response-page-api";
import LatestChapterFilter, {
  LatestChapterDisplay,
} from "../../../common/types/filter/LatestChapterFilter";
import {
  Lang,
  SourceName,
  UUID,
} from "../../../shared/src/types/primitives/Identifiers";
import { useFavoritesStore } from "../../../common/store/favorites.store";
import { FavoritesListName } from "../../../common/types/favorites/FavoritesList";
import { useCacheStore } from "../../../common/store/cache.store";

const useLatestChapters = () => {
  const {
    page,
    elements: chapters,
    fullyLoaded: noMoreChapters,
    fetch: _fetchChapters,
    refresh,
  } = useResponsePageApi<StoredChapter>(Config.getEnv().MANGO_BD_API_ENDPOINT);
  const [refreshing, setRefreshing] = useState(false);
  const { get: getFavoritesList } = useFavoritesStore();
  const { getIntersiteManga } = useCacheStore();
  const [mangaAllowed, setMangaAllowed] = useState<UUID[]>([]);
  const [display, setDisplay] = useState<LatestChapterDisplay>("list");
  const previousFilter = useRef<LatestChapterFilter>();

  const fetch = async (params?: LatestChapterFilter) => {
    await _fetchChapters(`/latestchapters`, {
      params,
      page: 1,
      limit: (params?.display ?? display) === "list" ? 20 : 18,
      resetElementsIfSuceed: true,
      saveParamsStateForNextFetching: true,
    });
  };

  const fetchNextPage = async () => {
    await _fetchChapters(`/latestchapters`);
  };

  const _refresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const _lookForAllMangaInFavorites = (
    favoritesListNames: FavoritesListName[]
  ) => {
    let _mangaAllowed = [];
    for (let name of favoritesListNames) {
      const favList = getFavoritesList(name);
      if (favList) {
        for (let intersiteMangaId of favList.intersiteMangaIds) {
          const intersiteManga = getIntersiteManga(intersiteMangaId);
          if (intersiteManga) {
            for (let m of intersiteManga.mangas) {
              _mangaAllowed.push(m.id);
            }
          }
        }
      }
    }
    setMangaAllowed(_mangaAllowed);
  };

  const filter = async (filter: LatestChapterFilter) => {
    if (JSON.stringify(previousFilter.current) === JSON.stringify(filter)) {
      return;
    }
    previousFilter.current = filter;
    if (filter.srcs || filter.langs) {
      await fetch({ srcs: filter.srcs, langs: filter.langs });
    } else {
      await fetch();
    }
    if (filter.favoritesLists) {
      _lookForAllMangaInFavorites(filter.favoritesLists);
    } else {
      setMangaAllowed([]);
    }
    if (filter.display) {
      setDisplay(filter.display);
    }
  };

  return {
    currentPage: page,
    chapters:
      mangaAllowed.length === 0
        ? chapters
        : chapters.filter((c) => mangaAllowed.includes(c.manga.id)),
    mangaAllowed,
    noMoreChapters,
    refreshing,
    display,
    previousFilter: previousFilter.current,
    fetch,
    fetchNextPage,
    refresh: _refresh,
    filter,
  };
};

export default useLatestChapters;
