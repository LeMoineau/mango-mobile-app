import { useRef, useState } from "react";
import {
  ChapterEndpoint,
  SourceName,
  UUID,
} from "../../../../../shared/src/types/primitives/Identifiers";
import Config from "../../../common/config/Config";
import { Image } from "react-native";
import useApi from "../../../../../shared/src/hooks/use-api";
import { PagedScrapedChapter } from "../../../../../shared/src/types/basics/Chapter";
import { ImageUtils } from "../../../common/utils/image-utils";
import { useDownloaderStore } from "../../../common/store/downloader.store";
import { ChapterPage } from "../../../../../shared/src/types/basics/ChapterPage";
import { isStoredDownloadedChapter } from "../../../common/types/downloader/DownloadedChapter";
import useFileSystem from "../../../common/hooks/use-file-system";

const useChapterReader = () => {
  const { fetch, post } = useApi(Config.getEnv().MANGO_SCRAPER_API_ENDPOINT);
  const { getDownloadedChapter } = useDownloaderStore();
  const { readString } = useFileSystem();
  /**
   * loaded page return to component
   */
  const [isFullyLoaded, setIsFullyLoaded] = useState<boolean>(false);
  /**
   * Target chapter identifers
   */
  const src = useRef<SourceName>();
  const scrapedChapter = useRef<PagedScrapedChapter>();
  /**
   * All loaded pages
   */
  const _pages = useRef<{ [key: number]: ChapterPageLoaded }>({});
  const maxPageNb = useRef<number>(0);
  const [pages, setPages] = useState<ChapterPageLoaded[]>([]);
  /**
   * Pages currently loading
   */
  const pagesLoading = useRef<number[]>([]);
  const downloadedChapterId = useRef<UUID>();
  const [currentPageReading, setCurrentPageReading] = useState<number>(0);

  const loadPages = async (chapterId: UUID) => {
    reset();
    const downloadedChapter = getDownloadedChapter(chapterId);
    if (!isStoredDownloadedChapter(downloadedChapter)) return;
    downloadedChapterId.current = downloadedChapter.chapterId;
    scrapedChapter.current = { ...downloadedChapter.chapter, pages: [] };
    maxPageNb.current = downloadedChapter.pagesURL.length;
    await loadNextPage(3);
  };

  const fetchPages = async (_src: SourceName, endpoint: ChapterEndpoint) => {
    reset();
    src.current = _src;
    await fetch<PagedScrapedChapter>(`/srcs/${_src}/chapters/${endpoint}`, {
      forceRefresh: true,
    }).then(async (res) => {
      if (!res) return;
      scrapedChapter.current = res;
      maxPageNb.current = res.pages.length;
      await loadNextPage(3);
    });
  };

  const _fetchPage = async (page: ChapterPage) => {
    return await post<Buffer>(
      `${Config.getEnv().MANGO_SCRAPER_API_ENDPOINT}/srcs/${
        src.current
      }/generatePage`,
      {
        page,
      },
      {
        config: {
          responseType: "arraybuffer",
        },
      }
    );
  };

  /**
   * Load the targeted page
   * @param pageNb page number
   */
  const loadPage = async (pageNb: number) => {
    if (!scrapedChapter.current || isFullyLoaded) {
      return;
    }
    if (pageNb <= 0 || pageNb > maxPageNb.current) {
      return;
    }
    if (pagesLoading.current.includes(pageNb - 1)) {
      return;
    }
    const pageToLoad = scrapedChapter.current.pages[pageNb - 1];
    pagesLoading.current.push(pageNb - 1);
    let base64Url = "";
    if (downloadedChapterId.current) {
      const downloadedChapter = getDownloadedChapter(
        downloadedChapterId.current
      );
      if (!isStoredDownloadedChapter(downloadedChapter)) return;
      const fileURI = downloadedChapter.pagesURL[pageNb - 1];
      base64Url = await readString(fileURI);
    } else {
      const imgBuffer = await _fetchPage(pageToLoad);
      if (!imgBuffer) return;
      const targetUrl = new URL(pageToLoad.url).href;
      base64Url = ImageUtils.generateBase64UrlFromBuffer(targetUrl, imgBuffer);
    }
    Image.getSize(base64Url, (width, height) => {
      _pages.current[pageNb - 1] = {
        base64Url,
        width,
        height,
      };
      setPages(Object.values(_pages.current));
      if (Object.keys(_pages.current).length === maxPageNb.current) {
        setIsFullyLoaded(true);
      }
    });
  };

  /**
   * Load the next page
   * @nNextPages N next pages to load (for exemple N=3, load pages 1, 2 and 3)
   */
  const loadNextPage = async (nNextPages?: number) => {
    const startingNextPage: number = Object.keys(_pages.current).length + 1;
    await loadPage(startingNextPage);
    if (nNextPages) {
      for (let i = 1; i <= nNextPages; i++) {
        await loadPage(startingNextPage + i);
      }
    }
  };

  /**
   * Reset chapter reader
   */
  const reset = () => {
    src.current = undefined;
    pagesLoading.current = [];
    downloadedChapterId.current = undefined;
    maxPageNb.current = 0;
    _pages.current = [];
    setPages([]);
    setIsFullyLoaded(false);
    setCurrentPageReading(0);
  };

  return {
    pages,
    maxPageNb: maxPageNb.current,
    isFullyLoaded,
    pagesLoading: pagesLoading.current,
    pagesLoaded: Object.keys(_pages.current).map((k) => Number(k)),
    scrapedChapter: scrapedChapter.current,
    currentPageReading,
    loadPages,
    fetchPages,
    loadPage,
    loadNextPage,
    reset,
    setCurrentPageReading,
  };
};

export default useChapterReader;
