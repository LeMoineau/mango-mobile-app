import { ActivityIndicator, Modal, ModalProps, Text, View } from "react-native";
import React, { useEffect } from "react";
import { style } from "../../utils/style-utils";
import { useTheme } from "@react-navigation/native";
import IntersiteChapter from "../../types/intersite/IntersiteChapter";
import useApi from "../../hooks/use-api";
import Config from "../../config/Config";
import { IntersiteUtils } from "../../utils/intersite-utils";
import ChapterViewer from "../../types/chapterViewer";

export default function ChapterReaderModal({
  chapter,
  ...props
}: { chapter: IntersiteChapter | undefined } & ModalProps) {
  const theme = useTheme();
  const { loading, fetch, get } = useApi<ChapterViewer>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );

  useEffect(() => {
    if (chapter) {
      const [src, id] = IntersiteUtils.getMoreTrustedSrcOfIntersiteField(
        chapter.id
      );
      if (src && id) {
        fetch(`/manga/${chapter.manga.formattedTitle}/chapters/${src}/${id}`);
      }
    }
  }, [chapter]);

  return (
    <Modal animationType="slide" {...props}>
      <View
        style={[
          style.justifyCenter,
          style.itemsCenter,
          { flex: 1, padding: 20, backgroundColor: theme.colors.background },
        ]}
      >
        {loading ? (
          <ActivityIndicator size={"large"}></ActivityIndicator>
        ) : !get() ? (
          <Text style={[{ color: theme.colors.text }]}>oops :/</Text>
        ) : (
          get()!.pages.map((p) => {
            return <Text>p</Text>;
          })
        )}
      </View>
    </Modal>
  );
}
