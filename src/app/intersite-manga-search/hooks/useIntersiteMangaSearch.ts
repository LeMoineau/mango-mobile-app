import { IntersiteManga } from "../../../../../shared/src/types/IntersiteManga";
import Config from "../../../common/config/Config";
import useResponsePageApi from "../../../common/hooks/use-response-page-api";

const useIntersiteMangaSearch = () => {
  const {
    elements: intersiteMangas,
    fetch,
    fullyLoaded,
  } = useResponsePageApi<IntersiteManga>(Config.getEnv().MANGO_BD_API_ENDPOINT);

  const fetchQuery = async (query: string) => {
    await fetch("/intersiteMangas", { params: { mangaTitle: query } });
  };

  return {
    intersiteMangas,
    fullyLoaded,
    fetchQuery,
  };
};

export default useIntersiteMangaSearch;
