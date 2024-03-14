import ChapterViewer from "@shared/types/chapterViewer";
import axios from "axios";
import { useRef, useState } from "react";
import { ChapterId, MangaId, SourceName } from "@shared/types/primitives/id";
import Config from "../config/Config";
import { encode } from "base-64";
import { Image, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { ChapterPageLoaded } from "../types/ChapterPageLoaded";
import { DefaultValues } from "../config/DefaultValues";

const useChapterReader = () => {
  /**
   * loaded page return to component
   */
  const [pagesLoaded, setPagesLoaded] = useState<ChapterPageLoaded[]>([]);
  const [isFullyLoaded, setIsFullyLoaded] = useState<boolean>(false);
  /**
   * Target chapter identifers
   */
  const src = useRef<SourceName>();
  const mangaId = useRef<MangaId>();
  const chapterId = useRef<ChapterId>();
  const chapterViewer = useRef<ChapterViewer>();
  /**
   * All loaded pages
   */
  const pages = useRef<{ [key: number]: ChapterPageLoaded }>({});
  /**
   * Pages currently loading
   */
  const pagesLoading = useRef<number[]>([]);

  /**
   * Select a chapterViewer for the chapter reader
   * @param s targeted src
   * @param mi targeted chapter's manga id
   * @param ci targeted chapter id
   * @param cv targeted chapterViewer
   */
  const selectChapterViewer = (
    s: SourceName,
    mi: MangaId,
    ci: ChapterId,
    cv: ChapterViewer
  ) => {
    src.current = s;
    mangaId.current = mi;
    chapterId.current = ci;
    chapterViewer.current = cv;
    pages.current = {};
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
  const loadPage = (pageNb: number) => {
    if (
      !chapterViewer.current ||
      !src.current ||
      !mangaId.current ||
      !chapterId.current
    ) {
      return;
    }
    if (pageNb <= 0 || pageNb > chapterViewer.current.nbPages) {
      return;
    }
    if (pagesLoading.current.includes(pageNb)) {
      return;
    }
    console.log("loading page " + pageNb + "/" + chapterViewer.current.nbPages);
    pagesLoading.current.push(pageNb);
    axios
      .get(
        `${Config.getEnv().MANGO_SCRAPER_API_ENDPOINT}/srcs/${
          src.current
        }/mangas/${mangaId.current}/chapters/${chapterId.current}/${pageNb}`,
        {
          responseType: "arraybuffer",
        }
      )
      .then((imgBuffer: any) => {
        const targetUrl = new URL(chapterViewer.current!.pages[pageNb - 1].url)
          .href;
        const base64Url = `data:image/${_getImgExtFromURL(
          targetUrl
        )};base64,${_arrayBufferToBase64(imgBuffer.data)}`;
        Image.getSize(base64Url, (width, height) => {
          pages.current[pageNb - 1] = {
            base64Url,
            width,
            height,
          };
          setPagesLoaded(Object.values(pages.current));
          if (
            Object.keys(pages.current).length === chapterViewer.current?.nbPages
          ) {
            setIsFullyLoaded(true);
          }
        });
      });
  };

  /**
   * Load the next page
   * @nNextPages N next pages to load (for exemple N=3, load pages 1, 2 and 3)
   */
  const loadNextPage = (nNextPages?: number) => {
    const startingNextPage: number = Object.keys(pages.current).length + 1;
    loadPage(startingNextPage);
    if (nNextPages) {
      for (let i = 1; i <= nNextPages; i++) {
        loadPage(startingNextPage + i);
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
    mangaId.current = undefined;
    chapterId.current = undefined;
    chapterViewer.current = undefined;
    pages.current = {};
    pagesLoading.current = [];
    setPagesLoaded([]);
    setIsFullyLoaded(false);
  };

  const onReaderScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollMax =
      event.nativeEvent.contentSize.height -
      event.nativeEvent.layoutMeasurement.height;
    const currentScrollHeight = event.nativeEvent.contentOffset.y;
    if (
      currentScrollHeight / scrollMax >=
      DefaultValues.READER_HEIGHT_RATE_UPDATE
    ) {
      loadNextPage(2);
    }
  };

  return {
    pagesLoaded,
    isFullyLoaded,
    selectChapterViewer,
    loadPage,
    loadNextPage,
    reset,
    onReaderScroll,
  };
};

export default useChapterReader;
