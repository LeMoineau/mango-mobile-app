import { useCacheStore } from "../../../common/store/cache.store";
import { UUID } from "../../../../../shared/src/types/primitives/Identifiers";
import useApi from "../../../../../shared/src/hooks/use-api";
import Config from "../../../common/config/Config";
import { IntersiteManga } from "../../../../../shared/src/types/IntersiteManga";

const useHome = () => {
  const { saveIntersiteManga } = useCacheStore();
  const { fetch } = useApi(Config.getEnv().MANGO_BD_API_ENDPOINT);

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
    await saveIntersiteManga(intersiteManga);
  };

  return { fetchIntersiteManga };
};

export default useHome;
