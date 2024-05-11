import { useState } from "react";
import { PagedScrapedChapter } from "../../../../../shared/src/types/basics/Chapter";

const useSinglePageDisplayer = ({
  pages,
  currentPageReading,
  chaptersFullyLoaded,
  setCurrentPageReading,
  loadNextPage,
}: {
  pages: ChapterPageLoaded[];
  scrapedChapter?: PagedScrapedChapter;
  currentPageReading: number;
  chaptersFullyLoaded: boolean;
  setCurrentPageReading: React.Dispatch<React.SetStateAction<number>>;
  loadNextPage: (nNextPages?: number) => Promise<void>;
}) => {
  const [currentPage, setCurrentPage] = useState<ChapterPageLoaded>();

  const goPreviousPage = () => {
    if (currentPageReading <= 0) return;
    const newPageNb = currentPageReading - 1;
    setCurrentPageReading(newPageNb);
    setCurrentPage(pages[newPageNb]);
  };

  const goNextPage = () => {
    if (currentPageReading >= pages.length - 1) return;
    const newPageNb = currentPageReading + 1;
    setCurrentPageReading(newPageNb);
    setCurrentPage(pages[newPageNb]);
    if (chaptersFullyLoaded) return;
    if (newPageNb >= pages.length - 3) {
      loadNextPage(2);
    }
  };

  return { currentPage, setCurrentPage, goPreviousPage, goNextPage };
};

export default useSinglePageDisplayer;
