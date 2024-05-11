import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { PagedScrapedChapter } from "../../../../../../shared/src/types/basics/Chapter";
import { DefaultValues } from "../../../../../../common/config/DefaultValues";

const useStripePagesDisplayer = ({
  pages,
  scrapedChapter,
  setCurrentPageReading,
  loadNextPage,
}: {
  pages: ChapterPageLoaded[];
  scrapedChapter?: PagedScrapedChapter;
  setCurrentPageReading: React.Dispatch<React.SetStateAction<number>>;
  loadNextPage: (nNextPages?: number) => Promise<void>;
}) => {
  const onReaderScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollMax =
      event.nativeEvent.contentSize.height -
      event.nativeEvent.layoutMeasurement.height;
    const currentScrollHeight = event.nativeEvent.contentOffset.y;
    if (scrapedChapter) {
      const currentPage = Math.floor(
        currentScrollHeight / (scrollMax / pages.length)
      );
      setCurrentPageReading(currentPage <= 0 ? 0 : currentPage);
    }
    if (
      currentScrollHeight / scrollMax >=
      DefaultValues.READER_HEIGHT_RATE_UPDATE
    ) {
      loadNextPage(2);
    }
  };

  return { onReaderScroll };
};

export default useStripePagesDisplayer;
