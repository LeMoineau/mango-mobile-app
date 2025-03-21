import { RefreshControl, View } from "react-native";
import ChapterItem from "./elements/ChapterItem";
import { useNavigation } from "@react-navigation/native";
import useLatestChapters from "./hooks/useLatestChapters";
import { useEffect } from "react";
import LatestChaptersHeader from "./elements/LatestChaptersHeader";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { TextFormatUtils } from "../../shared/src/utils/text-format-utils";
import { FlashList } from "@shopify/flash-list";
import LatestChapterFooter from "./elements/LatestChapterFooter";

export default function LatestChaptersPage() {
  const navigator: useNavigationType = useNavigation();
  const {
    chapters,
    currentPage,
    noMoreChapters,
    refreshing,
    mangaAllowed,
    fetch,
    fetchNextPage,
    refresh,
    filter,
  } = useLatestChapters();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <View style={[{ flex: 1, paddingHorizontal: 10 }]}>
      <View>
        <LatestChaptersHeader
          onSearch={(text) => {
            navigator.navigate("IntersiteMangaSearch", {
              query: text,
            });
          }}
          onFilter={async (filterParams) => {
            await filter(filterParams);
          }}
        ></LatestChaptersHeader>
      </View>
      <View style={[{ height: 75 }]}></View>
      <View style={[{ flex: 1 }]}>
        <FlashList
          data={chapters}
          keyExtractor={(c) => `latest-chapter-item-${c.id}`}
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
            <LatestChapterFooter
              noMoreChapters={noMoreChapters}
              mangaAllowed={mangaAllowed}
              currentPage={currentPage}
              onPressLoadMoreBtn={() => {
                fetchNextPage();
              }}
            ></LatestChapterFooter>
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
