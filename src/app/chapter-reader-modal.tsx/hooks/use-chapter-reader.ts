import axios from "axios";
import { useRef, useState } from "react";
import {
  ChapterEndpoint,
  SourceName,
} from "@shared/types/primitives/Identifiers";
import Config from "../../../common/config/Config";
import { encode } from "base-64";
import { Image } from "react-native";
import useApi from "../../../../../shared/src/hooks/use-api";
import { PagedScrapedChapter } from "../../../../../shared/src/types/Chapter";

const useChapterReader = () => {
  const { fetch } = useApi(Config.getEnv().MANGO_SCRAPER_API_ENDPOINT);
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
  const [pages, setPages] = useState<ChapterPageLoaded[]>([]);
  /**
   * Pages currently loading
   */
  const pagesLoading = useRef<number[]>([]);
  const [currentPageReading, setCurrentPageReading] = useState<number>(0);

  const fetchPages = async (_src: SourceName, endpoint: ChapterEndpoint) => {
    reset();
    src.current = _src;
    await fetch<PagedScrapedChapter>(`/srcs/${_src}/chapters/${endpoint}`, {
      forceRefresh: true,
    }).then(async (res) => {
      if (!res) return;
      scrapedChapter.current = res;
      await loadNextPage(3);
    });
  };

  const _arrayBufferToBase64 = (buffer: Buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return encode(binary);
  };

  /**
   * Load the targeted page
   * @param pageNb page number
   */
  const loadPage = async (pageNb: number) => {
    if (!scrapedChapter.current || !src.current || isFullyLoaded) {
      return;
    }
    if (pageNb <= 0 || pageNb > scrapedChapter.current.pages.length) {
      return;
    }
    if (pagesLoading.current.includes(pageNb - 1)) {
      return;
    }
    const pageToLoad = scrapedChapter.current.pages[pageNb - 1];
    pagesLoading.current.push(pageNb - 1);
    const imgBuffer = await axios.post(
      `${Config.getEnv().MANGO_SCRAPER_API_ENDPOINT}/srcs/${
        src.current
      }/generatePage`,
      {
        page: {
          ...pageToLoad,
        },
      },
      {
        responseType: "arraybuffer",
      }
    );
    const targetUrl = new URL(pageToLoad.url).href;
    const base64Url = `data:image/${_getImgExtFromURL(
      targetUrl
    )};base64,${_arrayBufferToBase64(imgBuffer.data)}`;
    Image.getSize(base64Url, (width, height) => {
      _pages.current[pageNb - 1] = {
        base64Url,
        width,
        height,
      };
      setPages(Object.values(_pages.current));
      if (
        Object.keys(_pages.current).length ===
        scrapedChapter.current?.pages.length
      ) {
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

  const _getImgExtFromURL = (url: string): string => {
    const res = url.match(/([\w-]+)(\.[\w-]+)+(?!.*\/)/gm);
    if (res && res?.length > 0 && res[0].includes(".")) {
      const ext = res[0].split(".")[1];
      if (ext === "jpg") {
        return "jpeg";
      }
      if (ext === "xml" || ext === "svg") {
        return "svg+xml";
      }
      return ext;
    }
    return "jpeg";
  };

  /**
   * Reset chapter reader
   */
  const reset = () => {
    src.current = undefined;
    pagesLoading.current = [];
    _pages.current = [];
    setPages([]);
    setIsFullyLoaded(false);
    setCurrentPageReading(0);
  };

  return {
    pages,
    isFullyLoaded,
    pagesLoading: pagesLoading.current,
    pagesLoaded: Object.keys(_pages.current).map((k) => Number(k)),
    scrapedChapter: scrapedChapter.current,
    currentPageReading,
    fetchPages,
    loadPage,
    loadNextPage,
    reset,
    setCurrentPageReading,
  };
};

export default useChapterReader;
