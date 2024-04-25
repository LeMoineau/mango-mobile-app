import {
  ActivityIndicator,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";
import { PagedScrapedChapter } from "../../../../../../../shared/src/types/Chapter";
import useSinglePageDisplayer from "./use-single-page-displayer";
import { style } from "../../../../../common/utils/style-utils";
import CustomImage from "../../../../../common/components/image/CustomImage";
import { useEffect } from "react";

export default function SinglePagePagesDisplayer({
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
  const { currentPage, setCurrentPage, goPreviousPage, goNextPage } =
    useSinglePageDisplayer({
      pages,
      scrapedChapter,
      currentPageReading,
      chaptersFullyLoaded,
      setCurrentPageReading,
      loadNextPage,
    });
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (pages.length > 0 && !currentPage) {
      setCurrentPage(pages[0]);
    }
  }, [pages]);

  return (
    <>
      <View style={[style.flexCol, { flex: 1 }]}>
        {stickyHeader}
        <View
          style={[
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            { flex: 1 },
          ]}
        >
          {currentPage ? (
            <CustomImage
              uri={currentPage.base64Url}
              width={width}
              height={currentPage.height * (width / currentPage.width)}
            ></CustomImage>
          ) : (
            <ActivityIndicator></ActivityIndicator>
          )}
          <Pressable
            style={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                width: "50%",
                height: "100%",
              },
            ]}
            onPress={() => {
              goPreviousPage();
            }}
          ></Pressable>
          <Pressable
            style={[
              {
                position: "absolute",
                top: 0,
                right: 0,
                width: "50%",
                height: "100%",
              },
            ]}
            onPress={() => {
              goNextPage();
            }}
          ></Pressable>
        </View>
        {stickyFooter}
      </View>
    </>
  );
}
