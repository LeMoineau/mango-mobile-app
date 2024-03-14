import { ActivityIndicator, FlatList, View } from "react-native";
import ChapterItem from "./elements/ChapterItem";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import IntersiteChapter from "@shared/types/intersite/IntersiteChapter";
import useApi from "@shared/hooks/use-api";
import Config from "../../common/config/Config";
import { useSettingsStore } from "../../common/store/settings.store";
import { ChapterId } from "@shared/types/primitives/id";
import { useNavigationType } from "@/common/types/NavigationTypes";

export default function LatestChaptersPage() {
  const theme = useTheme();
  const navigation: useNavigationType = useNavigation();

  const { data: latestchapters, fetch } = useApi<IntersiteChapter[]>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );
  const { getMoreTrustedIn } = useSettingsStore();

  useEffect(() => {
    fetch("/latestchapters");
  }, []);

  return (
    <View style={[{ flex: 1 }]}>
      <FlatList
        style={[{ flex: 1, width: "100%" }]}
        data={latestchapters}
        keyExtractor={(_, index) => `latest-chapter-item-${index}`}
        renderItem={({ item }) => (
          <ChapterItem
            chapter={item}
            pressChapterTitle={(chapter) => {
              const [src, chapterId] = getMoreTrustedIn<ChapterId>(chapter.id);
              if (!src || !chapterId) return;
              navigation.navigate("ChapterReader", {
                src,
                mangaId: chapter.manga.id[src],
                chapterId,
              });
            }}
            pressChapterItem={(chapter) => {
              navigation.navigate("MangaInfo", {
                formattedName: chapter.manga.formattedTitle,
              });
            }}
          ></ChapterItem>
        )}
        ListEmptyComponent={
          <ActivityIndicator size="large" color={theme.colors.primary} />
        }
      ></FlatList>
    </View>
  );
}
