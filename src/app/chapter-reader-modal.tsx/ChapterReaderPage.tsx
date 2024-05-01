import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import useChapterReader from "@/app/chapter-reader-modal.tsx/hooks/use-chapter-reader";
import { useRouteType } from "@/common/types/navigation/NavigationTypes";
import ChapterReaderHeader from "./elements/ChapterReaderHeader";
import useAnimatedValue from "../../common/hooks/use-animated-value";
import ChapterReaderMenu from "./elements/chapter-reader-menu/ChapterReaderMenu";
import ChapterReaderStickyFooter from "./elements/ChapterReaderStickyFooter";
import PagesDisplayer from "./elements/pages-displayers/PagesDisplayer";

export default function ChapterReaderPage() {
  const route: useRouteType<"ChapterReader"> = useRoute();

  const {
    pages,
    maxPageNb,
    pagesLoading,
    pagesLoaded,
    isFullyLoaded,
    scrapedChapter,
    currentPageReading,
    loadPages,
    fetchPages,
    setCurrentPageReading,
    loadNextPage,
  } = useChapterReader();
  const { animValue, enable, setEnabled } = useAnimatedValue({ duration: 350 });

  useEffect(() => {
    const params = route.params as any;
    if (params.chapterId) {
      loadPages(params.chapterId);
    } else if (params.src && params.endpoint) {
      fetchPages(params.src, params.endpoint);
    }
  }, []);

  return (
    <>
      <ChapterReaderMenu
        animValue={animValue}
        scrapedChapter={scrapedChapter}
        onRequestClose={() => setEnabled(!enable)}
      ></ChapterReaderMenu>

      <View style={[{ flex: 1 }]}>
        <PagesDisplayer
          pages={pages}
          scrapedChapter={scrapedChapter}
          chaptersFullyLoaded={isFullyLoaded}
          currentPageReading={currentPageReading}
          setCurrentPageReading={setCurrentPageReading}
          loadNextPage={loadNextPage}
          stickyHeader={
            <ChapterReaderHeader
              chapterTitle={scrapedChapter?.title}
              onMenuButtonPress={() => setEnabled(!enable)}
            ></ChapterReaderHeader>
          }
          stickyFooter={
            <ChapterReaderStickyFooter
              maxPageNb={maxPageNb}
              pagesLoaded={pagesLoaded}
              pagesLoading={pagesLoading}
              currentPageReading={currentPageReading}
              scrapedChapter={scrapedChapter}
            ></ChapterReaderStickyFooter>
          }
        ></PagesDisplayer>
      </View>
    </>
  );
}
