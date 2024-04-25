import { useRef, useState } from "react";
import { IntersiteManga } from "../../../../../shared/src/types/IntersiteManga";
import Config from "../../../common/config/Config";
import useResponsePageApi from "../../../common/hooks/use-response-page-api";
import useApi from "../../../../../shared/src/hooks/use-api";

const useIntersiteMangaSearch = () => {
  const {
    elements: intersiteMangas,
    fullyLoaded,
    fetch,
    reset,
  } = useResponsePageApi<IntersiteManga>(Config.getEnv().MANGO_BD_API_ENDPOINT);
  const { post } = useApi(Config.getEnv().MANGO_SCRAPER_API_ENDPOINT);
  const previousQuery = useRef<string>();
  const [loading, setLoading] = useState(false);

  const fetchNewQuery = async (query: string) => {
    previousQuery.current = query.trim();
    setLoading(true);
    reset();
    await post("/mangas/search", {
      query: previousQuery.current,
      syncWithBD: true,
    });
    await fetch("/intersiteMangas", {
      params: { mangaTitle: previousQuery.current },
      resetElementsIfSuceed: true,
      page: 1,
    });
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

  return {
    intersiteMangas,
    fullyLoaded,
    currentQuery: previousQuery.current,
    loading,
    fetchNewQuery,
    fetchQuery,
  };
};

export default useIntersiteMangaSearch;
