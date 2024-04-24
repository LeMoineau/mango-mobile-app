import { useWindowDimensions, View } from "react-native";
import { PagedScrapedChapter } from "../../../../../shared/src/types/Chapter";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../../../shared/src/config/enums/Colors";
import { useTheme } from "@react-navigation/native";

export default function ChapterReaderStickyFooter({
  scrapedChapter,
  pagesLoading,
  pagesLoaded,
  currentPageReading,
}: {
  scrapedChapter?: PagedScrapedChapter;
  pagesLoading: number[];
  pagesLoaded: number[];
  currentPageReading: number;
}) {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  return (
    <>
      {scrapedChapter && (
        <View
          style={[
            style.flexRow,
            style.itemsCenter,
            {
              position: "absolute",
              bottom: 0,
              left: 0,
              width: width,
              height: 10,
              minHeight: 10,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          ]}
        >
          {scrapedChapter.pages.map((_, index) => {
            return (
              <View
                key={`page-indicator-${index}`}
                style={[
                  {
                    marginRight: 1,
                    borderRadius: 2,
                    flex: 1,
                    height: "100%",
                    opacity: 0.8,
                    backgroundColor:
                      currentPageReading >= index
                        ? theme.colors.primary
                        : pagesLoaded.includes(index)
                        ? colors.gray[200]
                        : pagesLoading.includes(index)
                        ? colors.gray[400]
                        : colors.transparent,
                  },
                ]}
              ></View>
            );
          })}
        </View>
      )}
    </>
  );
}
