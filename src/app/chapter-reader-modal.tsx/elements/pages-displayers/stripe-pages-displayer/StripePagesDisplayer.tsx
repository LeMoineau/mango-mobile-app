import React from "react";
import { FlatList, Image, useWindowDimensions, View } from "react-native";
import useStripePagesDisplayer from "./hooks/use-stripe-pages-displayer";
import { PagedScrapedChapter } from "../../../../../../../shared/src/types/Chapter";
import StripePagesDisplayerFooter from "./components/StripePagesDisplayerFooter";

export default function StripePagesDisplayer({
  stickyHeader,
  stickyFooter,
  pages,
  scrapedChapter,
  chaptersFullyLoaded,
  setCurrentPageReading,
  loadNextPage,
}: {
  stickyHeader?: React.ReactElement;
  stickyFooter?: React.ReactElement;
  pages: ChapterPageLoaded[];
  scrapedChapter?: PagedScrapedChapter;
  chaptersFullyLoaded: boolean;
  setCurrentPageReading: React.Dispatch<React.SetStateAction<number>>;
  loadNextPage: (nNextPages?: number) => Promise<void>;
}) {
  const { width } = useWindowDimensions();
  const { onReaderScroll } = useStripePagesDisplayer({
    pages,
    scrapedChapter,
    setCurrentPageReading,
    loadNextPage,
  });

  return (
    <>
      <View style={[{ flex: 1 }]}>
        <FlatList
          stickyHeaderIndices={[0]}
          ListHeaderComponent={stickyHeader}
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
            <StripePagesDisplayerFooter
              chapterFullyLoaded={chaptersFullyLoaded}
            ></StripePagesDisplayerFooter>
          }
        ></FlatList>
      </View>
      {stickyFooter}
    </>
  );
}
