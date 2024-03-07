import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import ChapterItem from "./elements/ChapterItem";
import { useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import { style } from "../../common/utils/style-utils";
import IntersiteChapter from "@shared/types/intersite/IntersiteChapter";
import useApi from "../../common/hooks/use-api";
import Config from "../../common/config/Config";
import { IntersiteManga } from "@shared/types/intersite/IntersiteManga";
import { useMangaModal } from "../../common/store/manga-modal.store";
import { useChapterReaderModal } from "../../common/store/chapter-reader-modal.store";
import { useSettingsStore } from "../../common/store/settings.store";
import ChapterViewer from "@shared/types/chapterViewer";
import { ChapterId } from "@shared/types/primitives/id";

export default function LatestChaptersPage() {
  const theme = useTheme();
  const { loading, fetch, get } = useApi<IntersiteChapter[]>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );
  const { fetch: mangaFetcher } = useApi<IntersiteManga>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );
  const { fetch: chapterFetcher } = useApi<ChapterViewer>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );

  const { getMoreTrustedIn } = useSettingsStore();
  const { open: openMangaModal } = useMangaModal();
  const { open: openChapterReaderModal } = useChapterReaderModal();

  useEffect(() => {
    fetch("/latestchapters");
  }, []);

  return (
    <View style={[{ flex: 1 }]}>
      <ScrollView
        style={[{ backgroundColor: theme.colors.background, paddingTop: 10 }]}
        contentContainerStyle={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
        ]}
      >
        {loading || !get() ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <SafeAreaView style={[{ flex: 1, width: "100%" }]}>
            <FlatList
              style={[{ flex: 1, width: "100%" }]}
              data={get()}
              keyExtractor={(_, index) => `latest-chapter-item-${index}`}
              renderItem={({ item }) => (
                <ChapterItem
                  chapter={item}
                  pressChapterTitle={(chapter) => {
                    const [src, chapterId] = getMoreTrustedIn<ChapterId>(
                      chapter.id
                    );
                    if (!src || !chapterId) return;
                    openChapterReaderModal(
                      chapter.manga.formattedTitle,
                      src,
                      chapterId,
                      chapterFetcher
                    );
                  }}
                  pressChapterItem={(chapter) => {
                    openMangaModal(chapter.manga.formattedTitle, mangaFetcher);
                  }}
                ></ChapterItem>
              )}
            ></FlatList>
          </SafeAreaView>
        )}
      </ScrollView>
    </View>
  );
}
