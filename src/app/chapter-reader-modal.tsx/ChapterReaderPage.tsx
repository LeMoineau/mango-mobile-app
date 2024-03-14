import { FlatList, Image, View, useWindowDimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import useApi from "@shared/hooks/use-api";
import Config from "@/common/config/Config";
import { SourceName } from "@shared/types/primitives/id";
import ChapterViewer from "@shared/types/chapterViewer";
import useChapterReader from "@/common/hooks/use-chapter-reader";
import { useRouteType } from "@/common/types/NavigationTypes";
import ChapterReaderHeader from "./elements/ChapterReaderHeader";
import ChapterReaderFooter from "./elements/ChapterReaderFooter";
import ChapterReaderMenu from "./elements/ChapterReaderMenu";

export default function ChapterReaderPage() {
  const route: useRouteType<"ChapterReader"> = useRoute();

  const {
    pagesLoaded,
    isFullyLoaded,
    selectChapterViewer,
    loadNextPage,
    onReaderScroll,
  } = useChapterReader();
  const { data: chapterViewer, fetch } = useApi<ChapterViewer>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );
  const { width } = useWindowDimensions();
  const [menuShown, setMenuShown] = useState(false);

  useEffect(() => {
    const { src, mangaId, chapterId } = route.params;
    fetch(`/srcs/${src}/mangas/${mangaId}/chapters/${chapterId}`, true)
      .then((chapterViewer) => {
        if (!chapterViewer) {
          return;
        }
        selectChapterViewer(
          src as SourceName,
          mangaId!,
          chapterId!,
          chapterViewer
        );
        loadNextPage(2);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <ChapterReaderMenu
        shown={menuShown}
        chapterViewer={chapterViewer}
        onRequestClose={() => setMenuShown(!menuShown)}
      ></ChapterReaderMenu>

      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <ChapterReaderHeader
            chapterViewer={chapterViewer}
            onMenuButtonPress={() => setMenuShown(!menuShown)}
          ></ChapterReaderHeader>
        }
        onScroll={onReaderScroll}
        onMomentumScrollEnd={onReaderScroll}
        scrollEventThrottle={16}
        data={pagesLoaded}
        renderItem={({ item: page }) => (
          <Image
            source={{ uri: page.base64Url }}
            style={[{ width, height: page.height * (width / page.width) }]}
          ></Image>
        )}
        keyExtractor={(_, index) => `chapter-page-${index}`}
        ListFooterComponent={
          <ChapterReaderFooter
            chapterFullyLoaded={isFullyLoaded}
          ></ChapterReaderFooter>
        }
      ></FlatList>
    </>
  );
}
