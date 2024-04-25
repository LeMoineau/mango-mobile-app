import {
  ActivityIndicator,
  FlatList,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import MangaChapterItem from "./elements/IntersiteChapterItem";
import { useEffect } from "react";
import {
  useNavigationType,
  useRouteType,
} from "@/common/types/navigation/NavigationTypes";
import LoadingText from "@/common/components/text/LoadingText";
import useIntersiteMangaInfos from "./hooks/useIntersiteMangaInfos";
import { isParentlessIntersiteChapter } from "../../../../shared/src/types/IntersiteChapter";
import ThemedText from "../../common/components/text/ThemedText";
import IntersiteMangaInfosPageHeader from "./elements/IntersiteMangaInfosPageHeader";
import IntersiteMangaInfosStickyHeader from "./elements/IntersiteMangaInfosStickyHeader";
import CustomImage from "../../common/components/image/CustomImage";
import { style } from "../../common/utils/style-utils";
import RounedButton from "../../common/components/buttons/RoundedButton";

export default function IntersiteMangaInfosPage() {
  const route: useRouteType<"IntersiteMangaInfo"> = useRoute();
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const navigation: useNavigationType = useNavigation();

  const {
    loading,
    manga,
    chapters,
    chaptersLoading,
    chaptersFullyLoaded,
    refreshing,
    fetch,
    fetchScrapedManga,
    fetchIntersiteChapters,
    refreshIntersiteChapters,
  } = useIntersiteMangaInfos();

  useEffect(() => {
    fetch(route.params.intersiteMangaFormattedName);
  }, []);

  return (
    <>
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            flex: 1,
            width: width,
            minHeight: height,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        {manga && manga.image ? (
          <CustomImage
            uri={manga.image}
            width={"100%"}
            height={300}
            onError={async () => {
              await fetchScrapedManga(manga.src, manga);
            }}
          ></CustomImage>
        ) : (
          <LoadingText width={"100%"} height={300}></LoadingText>
        )}
      </View>
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <IntersiteMangaInfosStickyHeader></IntersiteMangaInfosStickyHeader>
        }
        data={["header", ...chapters]}
        keyExtractor={(_, index) => `manga-chapter-item-${index}`}
        renderItem={({ item, index }) => {
          if (isParentlessIntersiteChapter(item)) {
            return (
              <View style={[{ backgroundColor: theme.colors.background }]}>
                <MangaChapterItem
                  key={index}
                  intersiteChapter={item}
                  pressReadBtn={(chapter) => {
                    if (!manga) return;
                    navigation.navigate("ChapterReader", {
                      src: chapter.src,
                      endpoint: chapter.endpoint,
                      storedMangaId: manga.id,
                    });
                  }}
                ></MangaChapterItem>
              </View>
            );
          } else {
            return (
              <IntersiteMangaInfosPageHeader
                manga={manga}
                loading={loading}
              ></IntersiteMangaInfosPageHeader>
            );
          }
        }}
        ListFooterComponent={
          <>
            {loading || !chaptersFullyLoaded || chaptersLoading ? (
              <ActivityIndicator size={"large"}></ActivityIndicator>
            ) : (
              <View
                style={[
                  style.flexCol,
                  style.justifyCenter,
                  style.itemsCenter,
                  { paddingVertical: 10 },
                ]}
              >
                <ThemedText>
                  Seems that there are no more chapters...
                </ThemedText>
                <View style={[{ height: 10 }]}></View>
                <RounedButton
                  appendIcon={refreshing ? undefined : "refresh"}
                  content={refreshing ? "REFRESHING" : "REFRESH"}
                  contentStyle={[{ fontWeight: "500" }]}
                  styleProp={[
                    {
                      backgroundColor: refreshing
                        ? theme.colors.border
                        : theme.colors.primary,
                    },
                  ]}
                  onPress={async () => {
                    if (refreshing) return;
                    await refreshIntersiteChapters();
                  }}
                ></RounedButton>
              </View>
            )}
            <View style={[{ height: 50 }]}></View>
          </>
        }
        onEndReached={async () => {
          if (chaptersFullyLoaded || chaptersLoading) return;
          await fetchIntersiteChapters();
        }}
      ></FlatList>
    </>
  );
}
