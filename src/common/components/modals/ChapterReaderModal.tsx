import {
  ActivityIndicator,
  Image,
  Modal,
  ModalProps,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { style } from "../../utils/style-utils";
import { useTheme } from "@react-navigation/native";
import IntersiteChapter from "../../types/intersite/IntersiteChapter";
import useApi from "../../hooks/use-api";
import Config from "../../config/Config";
import ChapterViewer from "../../types/chapterViewer";
import { useSettingsStore } from "../../store/settings.store";
import { ImageUtils } from "../../utils/image-utils";

export default function ChapterReaderModal({
  chapter,
  ...props
}: { chapter: IntersiteChapter | undefined } & ModalProps) {
  const theme = useTheme();
  const { loading, data, refresh, fetch, get } = useApi<ChapterViewer>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );
  const { getMoreTrustedIn } = useSettingsStore();

  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    if (chapter) {
      console.log(chapter);
      const [src, id] = getMoreTrustedIn(chapter.id);
      if (src && id) {
        refresh();
        fetch(`/mangas/${chapter.manga.formattedTitle}/chapters/${src}/${id}`);
      }
    }
  }, [chapter]);

  useEffect(() => {
    if (data) {
      console.log(data);
      let pages = [];
      let counter = 0;
      data.pages.forEach(async (p, index) => {
        if (p.decryptionKey) {
          pages.push(
            (await ImageUtils.getBlobImageURL(p.url, p.decryptionKey)) as string
          );
        } else {
          pages.push(p.url);
        }
        counter++;
        if (counter >= data.pages.length) {
          setPages(pages);
          console.log("done!");
          console.log(pages.length);
        }
      });
    }
  }, [data]);

  return (
    <Modal animationType="slide" {...props}>
      <ScrollView
        style={[
          { flex: 1, padding: 20, backgroundColor: theme.colors.background },
        ]}
      >
        {!pages ? (
          <ActivityIndicator size={"large"}></ActivityIndicator>
        ) : (
          get()?.pages.map((p, index) => {
            return (
              <Image
                key={index}
                source={{
                  uri: p.url,
                }}
                style={[{ height: 200, width: 200, flex: 1 }]}
              ></Image>
            );
          })
        )}
      </ScrollView>
    </Modal>
  );
}
