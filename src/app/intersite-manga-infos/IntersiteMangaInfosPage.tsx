import {
  ActivityIndicator,
  FlatList,
  Image,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import MangaChapterItem from "./elements/IntersiteChapterItem";
import { useEffect } from "react";
import {
  useNavigationType,
  useRouteType,
} from "@/common/types/NavigationTypes";
import LoadingText from "@/common/components/text/LoadingText";
import useIntersiteMangaInfos from "./hooks/useIntersiteMangaInfos";
import { isParentlessIntersiteChapter } from "../../../../shared/src/types/IntersiteChapter";
import ThemedText from "../../common/components/text/ThemedText";
import IntersiteMangaInfosPageHeader from "./elements/IntersiteMangaInfosPageHeader";
import IntersiteMangaInfosStickyHeader from "./elements/IntersiteMangaInfosStickyHeader";

export default function IntersiteMangaInfosPage() {
  const route: useRouteType<"IntersiteMangaInfo"> = useRoute();
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const navigation: useNavigationType = useNavigation();

  const {
    loading,
    manga,
    chapters,
    chaptersFullyLoaded,
    fetch,
    fetchIntersiteChapters,
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
        {!loading && manga ? (
          <Image
            source={{
              uri: manga.image,
            }}
            style={[
              {
                width: "100%",
                height: 300,
              },
            ]}
          ></Image>
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
                      src: manga.src,
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
            {loading || !chaptersFullyLoaded ? (
              <ActivityIndicator size={"large"}></ActivityIndicator>
            ) : (
              <ThemedText>No more chapters to load</ThemedText>
            )}
            <View style={[{ height: 50 }]}></View>
          </>
        }
        onEndReached={() => {
          fetchIntersiteChapters();
        }}
      ></FlatList>
    </>
  );
}
