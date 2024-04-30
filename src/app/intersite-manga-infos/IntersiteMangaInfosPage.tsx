import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import IntersiteChapterItem from "./elements/IntersiteChapterItem";
import { useEffect } from "react";
import {
  useNavigationType,
  useRouteType,
} from "@/common/types/navigation/NavigationTypes";
import useIntersiteMangaInfos from "./hooks/useIntersiteMangaInfos";
import IntersiteMangaInfosHeader from "./elements/IntersiteMangaInfosHeader";
import IntersiteMangaInfosStickyHeader from "./elements/IntersiteMangaInfosStickyHeader";
import IntersiteMangaInfosFooter from "./elements/IntersiteMangaInfosFooter";
import IntersiteMangaInfosBackground from "./elements/IntersiteMangaInfosBackground";
import { FlashList } from "@shopify/flash-list";

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
    scrapeManga,
    refreshIntersiteChapters,
    changeSource,
    forceScrapingCurrentManga,
    onChaptersScroll,
    getAvailablesSources,
  } = useIntersiteMangaInfos();

  useEffect(() => {
    fetch(route.params);
  }, []);

  useEffect(() => {
    if (route.params.changeSource) {
      changeSource(route.params.changeSource);
    }
    if (route.params.forceScraping) {
      forceScrapingCurrentManga();
    }
  }, [route.params]);

  return (
    <>
      <View style={[{ flex: 1 }]}>
        <IntersiteMangaInfosBackground
          manga={manga}
          onLoadingImageError={async (m) => {
            await scrapeManga(m);
          }}
        ></IntersiteMangaInfosBackground>
        <IntersiteMangaInfosStickyHeader></IntersiteMangaInfosStickyHeader>
        <FlashList
          ListHeaderComponent={
            <IntersiteMangaInfosHeader
              manga={manga}
              loading={loading}
              availablesSources={
                intersiteManga ? getAvailablesSources() : undefined
              }
              intersiteMangaId={intersiteManga?.id}
              onDotsButtonPress={() => {
                if (!intersiteManga || !manga) return;
                navigation.navigate("DotsOptions", {
                  url: manga.url,
                  intersiteMangaId: intersiteManga.id,
                  availablesSources: getAvailablesSources()!,
                  currentSource: manga.src,
                });
              }}
              onChangeSource={(src) => {
                changeSource(src);
              }}
            ></IntersiteMangaInfosHeader>
          }
          data={chapters}
          estimatedItemSize={100}
          keyExtractor={(_, index) => `manga-chapter-item-${index}`}
          renderItem={({ item, index }) => (
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
          )}
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
          onScroll={onChaptersScroll}
        ></FlashList>
      </View>
    </>
  );
}
