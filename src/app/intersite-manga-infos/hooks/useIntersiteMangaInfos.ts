import {
  MangaFormattedName,
  SourceName,
  UUID,
} from "../../../shared/src/types/primitives/Identifiers";
import { useState } from "react";
import { IntersiteManga } from "../../../shared/src/types/basics/IntersiteManga";
import useMoreTrustedValue from "../../../common/hooks/use-more-trusted-value";
import {
  ParentlessStoredManga,
  ScrapedManga,
} from "../../../shared/src/types/basics/Manga";
import { useCacheStore } from "../../../common/store/cache.store";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { ArrayUtils } from "../../../shared/src/utils/array-utils";
import { useSettingsStore } from "../../../common/store/settings.store";
import useIntersiteMangaInfosFetcher from "./useIntersiteMangaInfosFetcher";

const useIntersiteMangaInfos = () => {
  const [intersiteManga, setIntersiteManga] = useState<IntersiteManga>();
  const [manga, setManga] = useState<ParentlessStoredManga>();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [mangaChaptersFullyLoaded, setMangaChaptersFullyLoaded] =
    useState(false);
  const [mangaChaptersLoading, setMangaChaptersLoading] = useState(false);
  const { getMoreTrustedManga } = useMoreTrustedValue();
  const { setCurrentIntersiteManga } = useCacheStore();
  const { get } = useSettingsStore();
  const {
    mangaChapters,
    currentChaptersPage,
    fetchScrapedManga,
    fetchIntersiteMangaById,
    fetchIntersiteMangaByFormattedName,
    fetchScrapedMangaChapters,
    fetchMangaChapters,
    resetMangaChapters,
  } = useIntersiteMangaInfosFetcher();

  const fetch = async (props: {
    intersiteMangaId?: UUID;
    intersiteMangaFormattedName?: MangaFormattedName;
    defaultSource?: SourceName;
  }) => {
    reset();
    setLoading(true);
    let intersiteManga = await _loadIntersiteManga(props);
    if (!intersiteManga) return;
    let manga = props.defaultSource
      ? intersiteManga.mangas.find((m) => m.src === props.defaultSource)
      : getMoreTrustedManga(intersiteManga);
    if (!manga) return;
    if (
      (!manga.author || !manga.image) &&
      get("autoScrapMangaInfos") === true
    ) {
      const scrapedManga = await fetchScrapedManga(manga);
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
    await _loadMangaChapters(manga);
    setLoading(false);
  };

  const _setIntersiteManga = (intersiteManga: IntersiteManga) => {
    setIntersiteManga(intersiteManga);
    setCurrentIntersiteManga(intersiteManga);
  };

  const _loadIntersiteManga = async (props: {
    intersiteMangaId?: UUID;
    intersiteMangaFormattedName?: MangaFormattedName;
  }): Promise<IntersiteManga | undefined> => {
    let intersiteManga: IntersiteManga | undefined;
    if (props.intersiteMangaId) {
      intersiteManga = await fetchIntersiteMangaById(props.intersiteMangaId);
    }
    if (props.intersiteMangaFormattedName) {
      intersiteManga = await fetchIntersiteMangaByFormattedName(
        props.intersiteMangaFormattedName
      );
    }
    return intersiteManga;
  };

  const _loadMangaChapters = async (
    tmpManga?: ParentlessStoredManga
  ): Promise<void> => {
    if (manga) tmpManga = manga;
    if (!tmpManga) return;
    setMangaChaptersLoading(true);
    let mangaChaptersPage = await fetchMangaChapters(tmpManga);
    if (!mangaChaptersPage) {
      const res = await fetchScrapedMangaChapters(
        tmpManga,
        currentChaptersPage
      );
      mangaChaptersPage = await fetchMangaChapters(tmpManga);
      if (!mangaChaptersPage) {
        setMangaChaptersFullyLoaded(true);
      }
    }
    setMangaChaptersLoading(false);
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
    const scrapedManga = await fetchScrapedManga(manga);
    if (!scrapedManga) return;
    const newIntersiteManga = _createNewIntersiteMangaFromScrapedManga(
      manga,
      scrapedManga
    );
    if (!newIntersiteManga) return;
    _setIntersiteManga(newIntersiteManga);
    setManga({ ...manga, ...scrapedManga });
  };

  const refreshMangaChapters = async (tmpManga?: ParentlessStoredManga) => {
    if (!tmpManga && !manga) return;
    setRefreshing(true);
    reset();
    await fetchMangaChapters((tmpManga ?? manga)!, {
      page: 1,
      resetElementsIfSuceed: true,
    });
    setRefreshing(false);
  };

  const reset = () => {
    resetMangaChapters();
    setMangaChaptersFullyLoaded(false);
  };

  const changeSource = async (src: SourceName) => {
    if (manga?.src === src) return;
    if (!intersiteManga) return;
    const targetManga = intersiteManga.mangas.find((m) => m.src === src);
    if (!targetManga) return;
    setLoading(true);
    if (!targetManga.author || !targetManga.image) {
      await scrapeManga(targetManga);
    } else {
      setManga(targetManga);
    }
    await refreshMangaChapters(targetManga);
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
    if (loading || mangaChaptersFullyLoaded || mangaChaptersLoading) return;
    _loadMangaChapters();
  };

  const getAvailablesSources = (): SourceName[] | undefined => {
    if (!intersiteManga) return;
    return ArrayUtils.uniques(intersiteManga.mangas.map((m) => m.src));
  };

  return {
    intersiteManga,
    manga,
    chapters: mangaChapters,
    loading,
    mangaChaptersLoading,
    mangaChaptersFullyLoaded,
    refreshing,
    fetch,
    scrapeManga,
    fetchMangaChapters,
    refreshMangaChapters,
    changeSource,
    forceScrapingCurrentManga,
    onChaptersScroll,
    getAvailablesSources,
  };
};

export default useIntersiteMangaInfos;
