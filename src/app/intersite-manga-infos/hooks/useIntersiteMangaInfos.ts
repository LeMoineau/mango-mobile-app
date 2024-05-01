import {
  MangaFormattedName,
  SourceName,
  UUID,
} from "../../../../../shared/src/types/primitives/Identifiers";
import Config from "../../../common/config/Config";
import useApi from "../../../../../shared/src/hooks/use-api";
import { ResponsePage } from "../../../../../shared/src/types/responses/ResponsePage";
import { useState } from "react";
import { IntersiteManga } from "../../../../../shared/src/types/basics/IntersiteManga";
import { ParentlessIntersiteChapter } from "../../../../../shared/src/types/basics/IntersiteChapter";
import useMoreTrustedValue from "../../../common/hooks/use-more-trusted-value";
import {
  ParentlessStoredManga,
  ScrapedManga,
} from "../../../../../shared/src/types/basics/Manga";
import useResponsePageApi from "../../../common/hooks/use-response-page-api";
import { useCacheStore } from "../../../common/store/cache.store";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { ArrayUtils } from "../../../../../shared/src/utils/array-utils";
import { useSettingsStore } from "../../../common/store/settings.store";

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
  const { get } = useSettingsStore();

  const _fetch = async (props: {
    intersiteMangaId?: UUID;
    intersiteMangaFormattedName?: MangaFormattedName;
  }) => {
    _reset();
    let intersiteManga = await _fetchIntersiteManga(props);
    if (!intersiteManga) return;
    let manga = getMoreTrustedManga(intersiteManga);
    if (!manga) return;
    if (
      (!manga.author || !manga.image) &&
      get("autoScrapMangaInfos") === true
    ) {
      const scrapedManga = await _fetchScrapedManga(manga);
      const updatedManga: ParentlessStoredManga = {
        ...manga,
        ...scrapedManga,
      };
      const index = intersiteManga.mangas.findIndex((m) => m.id === manga!.id);
      if (index !== -1) {
        intersiteManga.mangas.splice(index, 1, updatedManga);
      }
      manga = { ...updatedManga };
    }
    _setIntersiteManga(intersiteManga);
    setManga(manga);
    await fetchIntersiteChapters(intersiteManga);
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

  const fetchIntersiteChapters = async (tmpIntersiteManga?: IntersiteManga) => {
    if (!tmpIntersiteManga && !intersiteManga) return;
    setChaptersLoading(true);
    await _fetchIntersiteChapters(
      `/intersiteMangas/${
        (tmpIntersiteManga ?? intersiteManga)!.id
      }/intersiteChapters`
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
    if (manga?.src === src) return;
    setLoading(true);
    if (!intersiteManga) return;
    const targetManga = intersiteManga.mangas.find((m) => m.src === src);
    if (!targetManga) return;
    if (!targetManga.author || !targetManga.image) {
      await scrapeManga(targetManga);
    } else {
      setManga(targetManga);
    }
    setLoading(false);
  };

  const forceScrapingCurrentManga = async () => {
    if (!manga) return;
    setLoading(true);
    await scrapeManga(manga);
    setLoading(false);
  };

  const onChaptersScroll = (evt: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollMax =
      evt.nativeEvent.contentSize.height -
      evt.nativeEvent.layoutMeasurement.height;
    const currentScrollHeight = evt.nativeEvent.contentOffset.y;
    if (scrollMax - currentScrollHeight > 10) return;
    if (loading || fullyLoaded || chaptersLoading) return;
    fetchIntersiteChapters();
  };

  const getAvailablesSources = (): SourceName[] | undefined => {
    if (!intersiteManga) return;
    return ArrayUtils.uniques(intersiteManga.mangas.map((m) => m.src));
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
    forceScrapingCurrentManga,
    onChaptersScroll,
    getAvailablesSources,
  };
};

export default useIntersiteMangaInfos;
