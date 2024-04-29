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
  const [manga, setManga] = useState<ParentlessStoredManga>();
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
  const { getMoreTrustedManga } = useMoreTrustedValue();
  const { setCurrentIntersiteManga } = useCacheStore();

  // useEffect(() => {
  //   if (!intersiteManga) return;
  //   setIntersiteValue(intersiteManga);
  //   setCurrentIntersiteManga(intersiteManga);

  //   //Fetch intersiteChapters
  //   fetchIntersiteChapters();
  // }, [intersiteManga]);

  // useEffect(() => {
  //   if (currentIntersiteManga) {
  //     setIntersiteManga(currentIntersiteManga);
  //     setCurrentIntersiteManga(currentIntersiteManga);
  //   }
  //   //Fetch additional manga infos + chapters
  //   if (moreTrustedSrc && moreTrustedManga) {
  //     console.log("nouveau manga source");
  //     if (moreTrustedManga.author && moreTrustedManga.image) {
  //       console.log(
  //         "already scraped",
  //         moreTrustedManga,
  //         moreTrustedManga.author,
  //         moreTrustedManga.image
  //       );
  //       setLoading(false);
  //       return;
  //     }
  //     _fetchScrapedManga(moreTrustedSrc, moreTrustedManga).then((im) => {
  //       console.log("finish scraping", im);
  //       if (im) {
  //         setIntersiteManga(im);
  //         setCurrentIntersiteManga(im);
  //       }
  //       setLoading(false);
  //     });
  //   }
  // }, [moreTrustedSrc, moreTrustedManga]);

  const _fetch = async (props: {
    intersiteMangaId?: UUID;
    intersiteMangaFormattedName?: MangaFormattedName;
  }) => {
    _reset();
    let intersiteManga = await _fetchIntersiteManga(props);
    if (!intersiteManga) return;
    let manga = getMoreTrustedManga(intersiteManga);
    if (!manga) return;
    if (!manga.author || !manga.image) {
      await scrapeManga(manga);
    } else {
      _setIntersiteManga(intersiteManga);
      setManga(manga);
    }
    setLoading(false);
  };

  const _setIntersiteManga = (intersiteManga: IntersiteManga) => {
    setIntersiteManga(intersiteManga);
    setCurrentIntersiteManga(intersiteManga);
  };

  const _fetchIntersiteMangaById = async (
    intersiteMangaId: UUID
  ): Promise<IntersiteManga | undefined> => {
    const targetIntersiteManga = await fetch<IntersiteManga>(
      `/intersiteMangas/${intersiteMangaId}`,
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
  };

  const _fetchIntersiteMangaByFormattedName = async (
    intersiteMangaFormattedName: MangaFormattedName
  ): Promise<IntersiteManga | undefined> => {
    const intersiteMangaPage = await fetch<ResponsePage<IntersiteManga>>(
      "/intersiteMangas",
      {
        forceRefresh: true,
        config: {
          params: { formattedName: intersiteMangaFormattedName },
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
  };

  const _fetchIntersiteManga = async (props: {
    intersiteMangaId?: UUID;
    intersiteMangaFormattedName?: MangaFormattedName;
  }): Promise<IntersiteManga | undefined> => {
    let intersiteManga: IntersiteManga | undefined;
    if (props.intersiteMangaId) {
      intersiteManga = await _fetchIntersiteMangaById(props.intersiteMangaId);
    }
    if (props.intersiteMangaFormattedName) {
      intersiteManga = await _fetchIntersiteMangaByFormattedName(
        props.intersiteMangaFormattedName
      );
    }
    return intersiteManga;
  };

  const _fetchScrapedManga = async (
    manga: ParentlessStoredManga
  ): Promise<ScrapedManga | undefined> => {
    const scrapedManga = await fetch<ScrapedManga>(
      `/srcs/${manga.src}/mangas/${manga.endpoint}`,
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
    return scrapedManga;
  };

  const _createNewIntersiteMangaFromScrapedManga = (
    oldManga: ParentlessStoredManga,
    scrapedManga: ScrapedManga
  ): IntersiteManga | undefined => {
    if (!intersiteManga) return;
    const updatedManga: ParentlessStoredManga = {
      ...oldManga,
      ...scrapedManga,
    };
    const index = intersiteManga.mangas.findIndex((m) => m.id === oldManga.id);
    if (index !== -1) {
      intersiteManga.mangas.splice(index, 1, updatedManga);
    }
  };

  const scrapeManga = async (manga: ParentlessStoredManga) => {
    if (!intersiteManga) return;
    const scrapedManga = await _fetchScrapedManga(manga);
    if (!scrapedManga) return;
    const newIntersiteManga = _createNewIntersiteMangaFromScrapedManga(
      manga,
      scrapedManga
    );
    if (!newIntersiteManga) return;
    _setIntersiteManga(newIntersiteManga);
    setManga({ ...manga, ...scrapedManga });
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

  const changeSource = async (src: SourceName) => {
    setLoading(true);
    if (!intersiteManga) return;
    const targetManga = intersiteManga.mangas.find((m) => m.src === src);
    if (!targetManga) return;
    if (!targetManga.author || !targetManga.image) {
      await scrapeManga(targetManga);
    } else {
      setManga(targetManga);
    }
  };

  return {
    intersiteManga,
    manga,
    chapters: elements,
    loading,
    chaptersLoading,
    chaptersFullyLoaded: fullyLoaded,
    refreshing,
    fetch: _fetch,
    scrapeManga,
    fetchIntersiteChapters,
    refreshIntersiteChapters,
    changeSource,
  };
};

export default useIntersiteMangaInfos;
