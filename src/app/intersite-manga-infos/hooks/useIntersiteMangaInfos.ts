import {
  MangaFormattedName,
  SourceName,
  UUID,
} from "../../../../../shared/src/types/primitives/Identifiers";
import Config from "../../../common/config/Config";
import useApi from "../../../../../shared/src/hooks/use-api";
import { ResponsePage } from "../../../../../shared/src/types/responses/ResponsePage";
import { useEffect, useState } from "react";
import { IntersiteManga } from "../../../../../shared/src/types/IntersiteManga";
import { ParentlessIntersiteChapter } from "../../../../../shared/src/types/IntersiteChapter";
import useMoreTrustedValue from "../../../common/hooks/use-more-trusted-value";
import {
  ParentlessStoredManga,
  ScrapedManga,
} from "../../../../../shared/src/types/Manga";
import useResponsePageApi from "../../../common/hooks/use-response-page-api";
import { useCacheStore } from "../../../common/store/cache.store";

const useIntersiteMangaInfos = () => {
  const { fetch } = useApi(Config.getEnv().MANGO_BD_API_ENDPOINT);
  const [intersiteManga, setIntersiteManga] = useState<IntersiteManga>();
  const {
    moreTrustedValue: moreTrustedManga,
    moreTrustedSrc,
    setIntersiteValue,
  } = useMoreTrustedValue<IntersiteManga>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const {
    elements,
    fullyLoaded,
    fetch: _fetchIntersiteChapters,
    reset,
  } = useResponsePageApi<ParentlessIntersiteChapter>(
    Config.getEnv().MANGO_BD_API_ENDPOINT
  );
  const { setCurrentIntersiteManga } = useCacheStore();

  useEffect(() => {
    if (!intersiteManga) return;
    setIntersiteValue(intersiteManga);
    setCurrentIntersiteManga(intersiteManga);

    //Fetch intersiteChapters
    fetchIntersiteChapters();
  }, [intersiteManga]);

  useEffect(() => {
    //Fetch additional manga infos + chapters
    if (moreTrustedSrc && moreTrustedManga) {
      if (moreTrustedManga.author && moreTrustedManga.image) {
        setLoading(false);
        return;
      }
      _fetchScrapedManga(moreTrustedSrc, moreTrustedManga).then(() => {
        setLoading(false);
      });
    }
  }, [moreTrustedSrc, moreTrustedManga]);

  const _fetch = async (props: {
    intersiteMangaId?: UUID;
    intersiteMangaFormattedName?: MangaFormattedName;
  }) => {
    _reset();
    await _fetchIntersiteManga(props);
  };

  const _fetchIntersiteManga = async (props: {
    intersiteMangaId?: UUID;
    intersiteMangaFormattedName?: MangaFormattedName;
  }): Promise<IntersiteManga | undefined> => {
    if (props.intersiteMangaId) {
      const targetIntersiteManga = await fetch<IntersiteManga>(
        `/intersiteMangas/${props.intersiteMangaId}`,
        {
          forceRefresh: true,
        }
      );
      if (!targetIntersiteManga) {
        setLoading(false);
        return;
      }
      setIntersiteManga(targetIntersiteManga);
      return targetIntersiteManga;
    } else {
      const intersiteMangaPage = await fetch<ResponsePage<IntersiteManga>>(
        "/intersiteMangas",
        {
          forceRefresh: true,
          config: {
            params: { formattedName: props.intersiteMangaFormattedName },
          },
        }
      );
      if (!intersiteMangaPage || intersiteMangaPage.elements.length <= 0) {
        setLoading(false);
        return;
      }
      const targetIntersiteManga = intersiteMangaPage.elements[0];
      setIntersiteManga(targetIntersiteManga);
      return targetIntersiteManga;
    }
  };

  const _fetchScrapedManga = async (
    src: SourceName,
    manga: ParentlessStoredManga
  ) => {
    if (!intersiteManga) return;
    const scrapedManga = await fetch<ScrapedManga>(
      `/srcs/${src}/mangas/${manga.endpoint}`,
      {
        forceRefresh: true,
        config: {
          baseURL: Config.getEnv().MANGO_SCRAPER_API_ENDPOINT,
          params: { syncWithBD: true },
        },
      }
    );
    if (!scrapedManga) {
      setLoading(false);
      return;
    }
    const copy = { ...intersiteManga };
    const updatedManga: ParentlessStoredManga = { ...manga, ...scrapedManga };
    const index = intersiteManga.mangas.findIndex((m) => m.id === manga.id);
    copy.mangas.splice(index, 1, updatedManga);
    setIntersiteManga(copy);
    setIntersiteValue(copy);
  };

  const fetchIntersiteChapters = async () => {
    if (!intersiteManga) return;
    setChaptersLoading(true);
    await _fetchIntersiteChapters(
      `/intersiteMangas/${intersiteManga.id}/intersiteChapters`
    );
    setChaptersLoading(false);
  };

  const refreshIntersiteChapters = async () => {
    if (!intersiteManga) return;
    setRefreshing(true);
    await _fetchIntersiteChapters(
      `/intersiteMangas/${intersiteManga.id}/intersiteChapters`,
      { page: 1, resetElementsIfSuceed: true }
    );
    setRefreshing(false);
  };

  const _reset = () => {
    setLoading(true);
    reset();
  };

  return {
    intersiteManga,
    manga: moreTrustedManga,
    chapters: elements,
    loading,
    chaptersLoading,
    chaptersFullyLoaded: fullyLoaded,
    refreshing,
    fetch: _fetch,
    fetchScrapedManga: _fetchScrapedManga,
    fetchIntersiteChapters,
    refreshIntersiteChapters,
  };
};

export default useIntersiteMangaInfos;
