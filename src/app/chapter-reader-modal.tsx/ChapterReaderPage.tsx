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
    pagesLoading,
    pagesLoaded,
    isFullyLoaded,
    scrapedChapter,
    currentPageReading,
    fetchPages,
    setCurrentPageReading,
    loadNextPage,
  } = useChapterReader();
  const { animValue, enable, setEnabled } = useAnimatedValue({ duration: 350 });
  // const { get, set } = useSettingsStore();

  useEffect(() => {
    const { src, endpoint } = route.params;
    fetchPages(src, endpoint);
    console.log(currentPageReading);
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
              pagesLoaded={pagesLoaded}
              pagesLoading={pagesLoading}
              currentPageReading={currentPageReading}
              scrapedChapter={scrapedChapter}
            ></ChapterReaderStickyFooter>
          }
        ></PagesDisplayer>
        {/* <View style={[{ flex: 1 }]}>
          <FlatList
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <ChapterReaderHeader
                chapterTitle={scrapedChapter?.title}
                onMenuButtonPress={() => setEnabled(!enable)}
              ></ChapterReaderHeader>
            }
            onScroll={onReaderScroll}
            onMomentumScrollEnd={onReaderScroll}
            scrollEventThrottle={16}
            data={pages}
            renderItem={({ item: page }) => (
              <Image
                source={{ uri: page.base64Url }}
                style={[{ width, height: page.height * (width / page.width) }]}
              ></Image>
            )}
            keyExtractor={(_, index) => `chapter-page-${index}`}
            ListFooterComponent={
              <ChapterReaderFooter
                chapterFullyLoaded={isFullyLoaded}
              ></ChapterReaderFooter>
            }
          ></FlatList>
        </View>
        <ChapterReaderStickyFooter
          pagesLoaded={pagesLoaded}
          pagesLoading={pagesLoading}
          currentPageReading={currentPageReading}
          scrapedChapter={scrapedChapter}
        ></ChapterReaderStickyFooter> */}
      </View>
    </>
  );
}
