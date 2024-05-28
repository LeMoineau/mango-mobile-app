import { useEffect, useState } from "react";
import { IntersiteManga } from "../../../shared/src/types/basics/IntersiteManga";
import { FavoritesListName } from "../../../common/types/favorites/FavoritesList";
import { useFavoritesStore } from "../../../common/store/favorites.store";
import { useCacheStore } from "../../../common/store/cache.store";

const useFavoritesListInfos = (favListName: FavoritesListName) => {
  const [coverIntersiteMangas, _setCoverIntersiteMangas] = useState<
    IntersiteManga[]
  >([]);
  const { get } = useFavoritesStore();
  const { getIntersiteManga } = useCacheStore();

  useEffect(() => {
    setCoverIntersiteMangas();
  }, []);

  const setCoverIntersiteMangas = () => {
    const favList = get(favListName);
    if (!favList) return;
    let covers: IntersiteManga[] = [];
    let i = 0;
    let currentIntersiteManga: IntersiteManga | undefined;
    do {
      currentIntersiteManga = getIntersiteManga(favList.intersiteMangaIds[i]);
      if (currentIntersiteManga) {
        covers.push(currentIntersiteManga);
      }
      i++;
    } while (i < 3 && currentIntersiteManga);
    _setCoverIntersiteMangas(covers);
  };

  return {
    coverIntersiteMangas,
  };
};

export default useFavoritesListInfos;
