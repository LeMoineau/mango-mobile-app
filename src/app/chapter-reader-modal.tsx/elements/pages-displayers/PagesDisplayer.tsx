import { PagedScrapedChapter } from "../../../../shared/src/types/basics/Chapter";
import { useSettingsStore } from "../../../../common/store/settings.store";
import SinglePagePagesDisplayer from "./single-page-pages-displayer/SinglePagePagesDisplayer";
import StripePagesDisplayer from "./stripe-pages-displayer/StripePagesDisplayer";

export default function PagesDisplayer({
  stickyHeader,
  stickyFooter,
  pages,
  scrapedChapter,
  chaptersFullyLoaded,
  currentPageReading,
  setCurrentPageReading,
  loadNextPage,
}: {
  stickyHeader?: React.ReactElement;
  stickyFooter?: React.ReactElement;
  pages: ChapterPageLoaded[];
  scrapedChapter?: PagedScrapedChapter;
  chaptersFullyLoaded: boolean;
  currentPageReading: number;
  setCurrentPageReading: React.Dispatch<React.SetStateAction<number>>;
  loadNextPage: (nNextPages?: number) => Promise<void>;
}) {
  const { get } = useSettingsStore();
  return (
    <>
      {get("chapterReaderDisplayMode") === "stripe" ? (
        <StripePagesDisplayer
          stickyHeader={stickyHeader}
          stickyFooter={stickyFooter}
          pages={pages}
          scrapedChapter={scrapedChapter}
          chaptersFullyLoaded={chaptersFullyLoaded}
          setCurrentPageReading={setCurrentPageReading}
          loadNextPage={loadNextPage}
        ></StripePagesDisplayer>
      ) : (
        <SinglePagePagesDisplayer
          stickyHeader={stickyHeader}
          stickyFooter={stickyFooter}
          pages={pages}
          scrapedChapter={scrapedChapter}
          chaptersFullyLoaded={chaptersFullyLoaded}
          currentPageReading={currentPageReading}
          setCurrentPageReading={setCurrentPageReading}
          loadNextPage={loadNextPage}
        ></SinglePagePagesDisplayer>
      )}
    </>
  );
}
