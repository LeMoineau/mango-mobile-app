import { useRef } from "react";
import { IntersiteManga } from "../../../../../shared/src/types/IntersiteManga";
import Config from "../../../common/config/Config";
import useResponsePageApi from "../../../common/hooks/use-response-page-api";

const useIntersiteMangaSearch = () => {
  const {
    elements: intersiteMangas,
    fetch,
    fullyLoaded,
  } = useResponsePageApi<IntersiteManga>(Config.getEnv().MANGO_BD_API_ENDPOINT);
  const previousQuery = useRef<string>();

  const fetchNewQuery = async (query: string) => {
    previousQuery.current = query;
    await fetch("/intersiteMangas", {
      params: { mangaTitle: query },
      resetElementsIfSuceed: true,
      page: 1,
    });
  };

  const fetchQuery = async () => {
    if (!previousQuery.current) return;
    await fetch("/intersiteMangas", {
      params: { mangaTitle: previousQuery.current },
    });
  };

  return {
    intersiteMangas,
    fullyLoaded,
    currentQuery: previousQuery.current,
    fetchNewQuery,
    fetchQuery,
  };
};

export default useIntersiteMangaSearch;
