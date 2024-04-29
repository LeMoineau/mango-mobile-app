import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import ChapterItem from "./elements/ChapterItem";
import { useNavigation, useTheme } from "@react-navigation/native";
import useLatestChapters from "./hooks/use-latest-chapters";
import { useEffect } from "react";
import LatestChaptersHeader from "./elements/LatestChaptersHeader";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { TextFormatUtils } from "../../../../shared/src/utils/text-format-utils";

export default function LatestChaptersPage() {
  const theme = useTheme();
  const navigator: useNavigationType = useNavigation();
  const {
    chapters,
    noMoreChapters,
    refreshing,
    fetchNextPage,
    refresh,
    openIntersiteMangaPage,
    searchIntersiteManga,
  } = useLatestChapters();

  useEffect(() => {
    fetchNextPage();
  }, []);

  return (
    <View style={[{ flex: 1 }]}>
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <LatestChaptersHeader
            onSearch={(text) => {
              searchIntersiteManga(text);
            }}
          ></LatestChaptersHeader>
        }
        style={[{ flex: 1, width: "100%" }]}
        data={chapters}
        keyExtractor={(_, index) => `latest-chapter-item-${index}`}
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
      ></FlatList>
      <View style={{ height: 50 }}></View>
    </View>
  );
}
