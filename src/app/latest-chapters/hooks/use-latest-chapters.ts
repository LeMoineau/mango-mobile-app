import { useState } from "react";
import { StoredChapter } from "../../../../../shared/src/types/basics/Chapter";
import Config from "../../../common/config/Config";
import useResponsePageApi from "../../../common/hooks/use-response-page-api";
import LatestChapterFilter from "../../../common/types/filter/LatestChapterFilter";
import {
  SourceName,
  UUID,
} from "../../../../../shared/src/types/primitives/Identifiers";
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
  const { get } = useFavoritesStore();
  const { getIntersiteManga } = useCacheStore();
  const [mangaAllowed, setMangaAllowed] = useState<UUID[]>([]);

  const fetch = (params?: { srcs?: SourceName[] }) => {
    _fetchChapters(`/latestchapters`, {
      params,
      page: 1,
      resetElementsIfSuceed: true,
      saveParamsStateForNextFetching: true,
    });
  };

  const fetchNextPage = () => {
    _fetchChapters(`/latestchapters`);
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
      const favList = get(name);
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
    if (filter.srcs) {
      fetch({ srcs: filter.srcs });
    } else {
      fetch();
    }
    if (filter.favoritesLists) {
      _lookForAllMangaInFavorites(filter.favoritesLists);
    } else {
      setMangaAllowed([]);
    }
  };

  return {
    currentPage: page,
    chapters: chapters.filter(
      (c) => mangaAllowed.length <= 0 || mangaAllowed.includes(c.manga.id)
    ),
    mangaAllowed,
    noMoreChapters,
    refreshing,
    fetch,
    fetchNextPage,
    refresh: _refresh,
    filter,
  };
};

export default useLatestChapters;
