import { FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import IntersiteChapterItem from "./elements/IntersiteChapterItem";
import { useEffect } from "react";
import {
  useNavigationType,
  useRouteType,
} from "@/common/types/navigation/NavigationTypes";
import useIntersiteMangaInfos from "./hooks/useIntersiteMangaInfos";
import { isParentlessIntersiteChapter } from "../../../../shared/src/types/IntersiteChapter";
import IntersiteMangaInfosHeader from "./elements/IntersiteMangaInfosHeader";
import IntersiteMangaInfosStickyHeader from "./elements/IntersiteMangaInfosStickyHeader";
import IntersiteMangaInfosFooter from "./elements/IntersiteMangaInfosFooter";
import IntersiteMangaInfosBackground from "./elements/IntersiteMangaInfosBackground";

export default function IntersiteMangaInfosPage() {
  const route: useRouteType<"IntersiteMangaInfo"> = useRoute();
  const navigation: useNavigationType = useNavigation();

  const {
    intersiteManga,
    manga,
    chapters,
    loading,
    chaptersLoading,
    chaptersFullyLoaded,
    refreshing,
    fetch,
    fetchScrapedManga,
    fetchIntersiteChapters,
    refreshIntersiteChapters,
  } = useIntersiteMangaInfos();

  useEffect(() => {
    fetch(route.params);
  }, []);

  return (
    <>
      <IntersiteMangaInfosBackground
        manga={manga}
        onLoadingImageError={async (m) => {
          await fetchScrapedManga(m.src, m);
        }}
      ></IntersiteMangaInfosBackground>
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <IntersiteMangaInfosStickyHeader></IntersiteMangaInfosStickyHeader>
        }
        data={["header", ...chapters]}
        keyExtractor={(_, index) => `manga-chapter-item-${index}`}
        renderItem={({ item, index }) => {
          if (!isParentlessIntersiteChapter(item)) {
            return (
              <IntersiteMangaInfosHeader
                manga={manga}
                intersiteMangaId={intersiteManga?.id}
                loading={loading}
                onDotsButtonPress={() => {
                  if (!intersiteManga || !manga) return;
                  navigation.navigate("DotsOptions", {
                    url: manga.url,
                    intersiteMangaId: intersiteManga.id,
                  });
                }}
              ></IntersiteMangaInfosHeader>
            );
          } else {
            return (
              <IntersiteChapterItem
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
                pressDotsBtn={(chapter) => {
                  navigation.navigate("DotsOptions", {
                    url: chapter.url,
                    chapterId: chapter.id,
                  });
                }}
              ></IntersiteChapterItem>
            );
          }
        }}
        ListFooterComponent={
          <IntersiteMangaInfosFooter
            loading={loading}
            chaptersFullyLoaded={chaptersFullyLoaded}
            chaptersLoading={chaptersLoading}
            refreshing={refreshing}
            onPressRefreshBtn={async () => {
              await refreshIntersiteChapters();
            }}
          ></IntersiteMangaInfosFooter>
        }
        onEndReached={async () => {
          if (chaptersFullyLoaded || chaptersLoading) return;
          await fetchIntersiteChapters();
        }}
      ></FlatList>
    </>
  );
}
