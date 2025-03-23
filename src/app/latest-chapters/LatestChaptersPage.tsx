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
import { style } from "../../common/utils/style-utils";

export default function LatestChaptersPage() {
  const navigator: useNavigationType = useNavigation();
  const {
    chapters,
    currentPage,
    noMoreChapters,
    refreshing,
    mangaAllowed,
    display,
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
          horizontal={display === "by src"}
          numColumns={display !== "list" ? 3 : undefined}
          data={chapters}
          keyExtractor={(c) => {
            return c.id;
          }}
          estimatedItemSize={110}
          renderItem={({ item }) => (
            <View style={[style.wFull, style.hFull, style.itemsCenter]}>
              <ChapterItem
                coverCard={display !== "list"}
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
                    intersiteMangaFormattedName:
                      TextFormatUtils.formatMangaTitle(item.manga.title),
                  });
                }}
              ></ChapterItem>
            </View>
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
