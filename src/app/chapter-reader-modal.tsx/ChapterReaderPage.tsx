import { FlatList, Image, Text, useWindowDimensions, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import useChapterReader from "@/app/chapter-reader-modal.tsx/hooks/use-chapter-reader";
import { useRouteType } from "@/common/types/NavigationTypes";
import ChapterReaderHeader from "./elements/ChapterReaderHeader";
import ChapterReaderFooter from "./elements/ChapterReaderFooter";
import useAnimatedValue from "../../common/hooks/use-animated-value";
import ChapterReaderMenu from "./elements/ChapterReaderMenu";
import { colors } from "../../../../shared/src/config/enums/Colors";
import ChapterReaderStickyFooter from "./elements/ChapterReaderStickyFooter";

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
    onReaderScroll,
  } = useChapterReader();
  const { width } = useWindowDimensions();
  const { animValue, enable, setEnabled } = useAnimatedValue({ duration: 350 });

  useEffect(() => {
    const { src, endpoint } = route.params;
    fetchPages(src, endpoint);
  }, []);

  return (
    <>
      <ChapterReaderMenu
        animValue={animValue}
        shown={enable}
        scrapedChapter={scrapedChapter}
        onRequestClose={() => setEnabled(!enable)}
      ></ChapterReaderMenu>

      <View style={[{ flex: 1 }]}>
        <View style={[{ flex: 1 }]}>
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
        ></ChapterReaderStickyFooter>
      </View>
    </>
  );
}
