import { useState } from "react";
import {
  MangaFormattedName,
  SourceName,
  UUID,
} from "../../../shared/src/types/primitives/Identifiers";
import { IntersiteManga } from "../../../shared/src/types/basics/IntersiteManga";
import useResponsePageApi from "../../../common/hooks/use-response-page-api";
import useApi from "../../../shared/src/hooks/use-api";
import Config from "../../../common/config/Config";
import {
  IdentifiedChapter,
  SourcelessChapter,
} from "../../../shared/src/types/basics/Chapter";
import { ResponsePage } from "../../../shared/src/types/responses/ResponsePage";
import {
  ParentlessStoredManga,
  ScrapedManga,
} from "../../../shared/src/types/basics/Manga";

const useIntersiteMangaInfosFetcher = () => {
  const {
    elements: mangaChapters,
    page,
    fetch: _fetchBDMangaChapterPage,
    reset: resetMangaChapters,
  } = useResponsePageApi<IdentifiedChapter>(
    Config.getEnv().MANGO_BD_API_ENDPOINT
  );
  const { fetch } = useApi(Config.getEnv().MANGO_BD_API_ENDPOINT);

  const [intersiteMangaloading, setIntersiteMangaLoading] = useState(false);
  const [mangaScrapingLoading, setMangaScrapingLoading] = useState(false);
  const [mangaChaptersScrapingLoading, setMangaChaptersScrapingLoading] =
    useState(false);
  const [mangaChaptersLoading, setMangaChaptersLoading] = useState(false);

  const fetchIntersiteMangaById = async (
    intersiteMangaId: UUID
  ): Promise<IntersiteManga | undefined> => {
    setIntersiteMangaLoading(true);
    const targetIntersiteManga = await fetch<IntersiteManga>(
      `/intersiteMangas/${intersiteMangaId}`,
      {
        forceRefresh: true,
      }
    );
    setIntersiteMangaLoading(false);
    return targetIntersiteManga;
  };

  const fetchIntersiteMangaByFormattedName = async (
    intersiteMangaFormattedName: MangaFormattedName
  ): Promise<IntersiteManga | undefined> => {
    setIntersiteMangaLoading(true);
    const intersiteMangaPage = await fetch<ResponsePage<IntersiteManga>>(
      "/intersiteMangas",
      {
        forceRefresh: true,
        config: {
          params: { formattedName: intersiteMangaFormattedName },
        },
      }
    );
    setIntersiteMangaLoading(false);
    if (!intersiteMangaPage || intersiteMangaPage.elements.length <= 0) {
      return;
    }
    const targetIntersiteManga = intersiteMangaPage.elements[0];
    return targetIntersiteManga;
  };

  const fetchScrapedManga = async (
    manga: ParentlessStoredManga
  ): Promise<ScrapedManga | undefined> => {
    setMangaScrapingLoading(true);
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
    setMangaScrapingLoading(false);
    return scrapedManga;
  };

  const fetchScrapedMangaChapters = async (
    manga: ParentlessStoredManga,
    page: number
  ): Promise<ResponsePage<SourcelessChapter> | undefined> => {
    setMangaChaptersScrapingLoading(true);
    const scrapedPage = await fetch<ResponsePage<SourcelessChapter>>(
      `/srcs/${manga.src}/mangas/${manga.endpoint}/chapters`,
      {
        forceRefresh: true,
        config: {
          baseURL: Config.getEnv().MANGO_SCRAPER_API_ENDPOINT,
          params: { syncWithBD: true, page },
        },
      }
    );
    setMangaChaptersScrapingLoading(false);
    return scrapedPage;
  };

  const fetchMangaChapters = async (
    manga: ParentlessStoredManga,
    props?: { page?: number; resetElementsIfSuceed?: boolean }
  ): Promise<ResponsePage<IdentifiedChapter> | undefined> => {
    if (!manga) return;
    setMangaChaptersLoading(true);
    const mangaChaptersPage = await _fetchBDMangaChapterPage(
      `/mangas/${manga.id}/chapters`,
      { page: props?.page, resetElementsIfSuceed: props?.resetElementsIfSuceed }
    );
    setMangaChaptersLoading(false);
    return mangaChaptersPage;
  };

  return {
    intersiteMangaloading,
    mangaScrapingLoading,
    mangaChaptersScrapingLoading,
    mangaChaptersLoading,
    mangaChapters,
    currentChaptersPage: page,
    fetchIntersiteMangaById,
    fetchIntersiteMangaByFormattedName,
    fetchScrapedManga,
    fetchScrapedMangaChapters,
    fetchMangaChapters,
    resetMangaChapters,
  };
};

export default useIntersiteMangaInfosFetcher;
