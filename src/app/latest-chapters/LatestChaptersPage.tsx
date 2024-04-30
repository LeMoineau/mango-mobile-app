import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import ChapterItem from "./elements/ChapterItem";
import { useNavigation, useTheme } from "@react-navigation/native";
import useLatestChapters from "./hooks/use-latest-chapters";
import { useEffect } from "react";
import LatestChaptersHeader from "./elements/LatestChaptersHeader";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { TextFormatUtils } from "../../../../shared/src/utils/text-format-utils";
import { FlashList } from "@shopify/flash-list";

export default function LatestChaptersPage() {
  const theme = useTheme();
  const navigator: useNavigationType = useNavigation();
  const { chapters, noMoreChapters, refreshing, fetchNextPage, refresh } =
    useLatestChapters();

  useEffect(() => {
    fetchNextPage();
  }, []);

  return (
    <View style={[{ flex: 1 }]}>
      <View>
        <LatestChaptersHeader
          onSearch={(text) => {
            navigator.navigate("IntersiteMangaSearch", {
              query: text,
            });
          }}
        ></LatestChaptersHeader>
      </View>
      <View style={[{ height: 60 }]}></View>
      <View style={[{ flex: 1 }]}>
        <FlashList
          data={chapters}
          keyExtractor={(_, index) => `latest-chapter-item-${index}`}
          estimatedItemSize={110}
          renderItem={({ item }) => (
            <ChapterItem
              chapter={item}
              pressChapterTitle={() => {
                navigator.navigate("ChapterReader", {
                  src: item.src,
                  endpoint: item.endpoint,
                  storedMangaId: item.manga.id,
                });
              }}
              pressChapterItem={() => {
                navigator.navigate("IntersiteMangaInfo", {
                  intersiteMangaFormattedName: TextFormatUtils.formatMangaTitle(
                    item.manga.title
                  ),
                });
              }}
            ></ChapterItem>
          )}
          ListFooterComponent={
            <>
              {noMoreChapters ? (
                <Text>No More Chapters</Text>
              ) : (
                <ActivityIndicator
                  size="large"
                  style={{ paddingBottom: 20 }}
                  color={theme.colors.primary}
                />
              )}
            </>
          }
          onEndReached={() => {
            fetchNextPage();
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                refresh();
              }}
            ></RefreshControl>
          }
        ></FlashList>
        <View style={{ height: 50 }}></View>
      </View>
    </View>
  );
}
