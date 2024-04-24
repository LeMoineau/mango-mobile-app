import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import ChapterItem from "./elements/ChapterItem";
import { useTheme } from "@react-navigation/native";
import LatestChaptersSearchBar from "./elements/LatestChaptersSearchBar";
import useLatestChapters from "./hooks/use-latest-chapters";
import { useEffect } from "react";

export default function LatestChaptersPage() {
  const theme = useTheme();
  const {
    chapters,
    fetchNextPage,
    noMoreChapters,
    openIntersiteMangaPage,
    refreshing,
    refresh,
  } = useLatestChapters();

  useEffect(() => {
    fetchNextPage();
  }, []);

  return (
    <View style={[{ flex: 1 }]}>
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View>
            <LatestChaptersSearchBar></LatestChaptersSearchBar>
          </View>
        }
        style={[{ flex: 1, width: "100%" }]}
        data={chapters}
        keyExtractor={(_, index) => `latest-chapter-item-${index}`}
        renderItem={({ item }) => (
          <ChapterItem
            chapter={item}
            pressChapterTitle={openIntersiteMangaPage}
            pressChapterItem={openIntersiteMangaPage}
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
