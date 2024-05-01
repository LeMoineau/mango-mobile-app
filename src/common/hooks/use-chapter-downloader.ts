import useApi from "../../../../shared/src/hooks/use-api";
import {
  IdentifiedChapter,
  PagedScrapedChapter,
} from "../../../../shared/src/types/Chapter";
import { ChapterPage } from "../../../../shared/src/types/ChapterPage";
import {
  ChapterEndpoint,
  SourceName,
  UUID,
} from "../../../../shared/src/types/primitives/Identifiers";
import Config from "../config/Config";
import { useDownloaderStore } from "../store/downloader.store";
import { ImageUtils } from "../utils/image-utils";
import useFileSystem from "./use-file-system";

const useChapterDownloader = (chapterId: UUID) => {
  const { fetch, post } = useApi(Config.getEnv().MANGO_SCRAPER_API_ENDPOINT);
  const {
    getDownloadedChapter,
    startDownloading,
    progressDownloading,
    errorDownloading,
    finishDownloading,
  } = useDownloaderStore();
  const { downloadString } = useFileSystem();

  const _scrapePagedScrapedChapter = async (
    src: SourceName,
    endpoint: ChapterEndpoint
  ) => {
    return await fetch<PagedScrapedChapter>(
      `/srcs/${src}/chapters/${endpoint}`,
      {
        forceRefresh: true,
      }
    );
  };

  const _scrapePage = async (src: SourceName, page: ChapterPage) => {
    return await post<Buffer>(
      `${Config.getEnv().MANGO_SCRAPER_API_ENDPOINT}/srcs/${src}/generatePage`,
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

  const download = async (chapter: IdentifiedChapter) => {
    const chapterPage = await _scrapePagedScrapedChapter(
      chapter.src,
      chapter.endpoint
    );
    if (!chapterPage) return;
    const tmp = { ...chapterPage };
    tmp.pages = [];
    startDownloading(chapterId, tmp);
    let index = 0;
    let pagesURL = [];
    for (let page of chapterPage.pages) {
      index += 1;
      const imgBuffer = await _scrapePage(chapter.src, page);
      if (imgBuffer) {
        const targetUrl = new URL(page.url).href;
        const base64Url = ImageUtils.generateBase64UrlFromBuffer(
          targetUrl,
          imgBuffer
        );
        const downloadURL = await downloadString(
          `${chapter.id}-page-${index}`,
          ImageUtils.getImgExtFromURL(targetUrl),
          base64Url
        );
        pagesURL.push(downloadURL);
        progressDownloading(chapterId, index / chapterPage.pages.length);
      } else {
        errorDownloading(chapterId);
      }
    }
    finishDownloading(chapterId, pagesURL);
  };
  return {
    downloadingChapter: getDownloadedChapter(chapterId),
    download,
  };
};

export default useChapterDownloader;
