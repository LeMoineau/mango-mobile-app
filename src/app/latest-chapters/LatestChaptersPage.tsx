import { ActivityIndicator, ScrollView, View } from "react-native";
import ChapterItem from "./elements/ChapterItem";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { style } from "../../common/utils/style-utils";
import useModals from "../../common/hooks/use-modals";
import ChapterReaderModal from "../../common/components/modals/ChapterReaderModal";
import IntersiteChapter from "../../common/types/intersite/IntersiteChapter";
import useApi from "../../common/hooks/use-api";
import Config from "../../common/config/Config";
import MangaInfosModal from "../manga-infos-modal/MangaInfosModal";

export default function LatestChaptersPage() {
  const theme = useTheme();
  const { isVisible, show, hide } = useModals<
    "chapter-reader-modal" | "manga-info-modal"
  >();
  const { loading, fetch, get } = useApi<IntersiteChapter[]>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );

  const [chapter, setChapter] = useState<IntersiteChapter>();
  const [targetMangaName, setTargetMangaName] = useState<string>();

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
          get()!.map((c, i) => {
            return (
              <ChapterItem
                key={i}
                chapter={c}
                pressChapterTitle={(chapter) => {
                  setChapter(chapter);
                  show("chapter-reader-modal");
                }}
                pressChapterItem={(chapter) => {
                  setTargetMangaName(chapter.manga.formattedTitle);
                  show("manga-info-modal");
                }}
              ></ChapterItem>
            );
          })
        )}
      </ScrollView>
      {isVisible("chapter-reader-modal") && (
        <ChapterReaderModal
          chapter={chapter}
          visible={isVisible("chapter-reader-modal")}
          onRequestClose={() => hide("chapter-reader-modal")}
        ></ChapterReaderModal>
      )}
      {isVisible("manga-info-modal") && (
        <MangaInfosModal
          formattedName={targetMangaName}
          visible={isVisible("manga-info-modal")}
          onRequestClose={() => hide("manga-info-modal")}
        ></MangaInfosModal>
      )}
    </View>
  );
}
