import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ModalProps,
  SafeAreaView,
  ScrollView,
  Text,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { useSettingsStore } from "../../common/store/settings.store";
import { useChapterReaderModal } from "../../common/store/chapter-reader-modal.store";
import ImageViewer from "react-native-image-zoom-viewer";
import { ImageUtils } from "../../common/utils/image-utils";
import { IntersiteUtils } from "../../common/utils/intersite-utils";

export default function ChapterReaderModal({ ...props }: {} & ModalProps) {
  const theme = useTheme();

  const { currentChapterOpen } = useChapterReaderModal();

  const { width, height } = useWindowDimensions();
  const [loadedPages, setLoadedPages] = useState<{ url: string }[]>([]);

  useEffect(() => {
    if (currentChapterOpen) {
      setLoadedPages([]);
      new Promise(async (resolve: (val: { url: string }[]) => void, reject) => {
        let tmpPages: { url: string }[] = [];
        for (let p of currentChapterOpen.pages) {
          tmpPages.push({
            url: p.decryptionKey
              ? ((await ImageUtils.getBlobImageURL(
                  p.url,
                  p.decryptionKey
                )) as string)
              : p.url,
          });
        }
        resolve(tmpPages);
      }).then((res: { url: string }[]) => {
        setLoadedPages(res);
        console.log("loaded", res.length, "/", currentChapterOpen.pages.length);
      });
    }
  }, [currentChapterOpen]);

  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={false}
      hardwareAccelerated
      {...props}
    >
      <ScrollView
        style={[
          { flex: 1, padding: 20, backgroundColor: theme.colors.background },
        ]}
      >
        {!currentChapterOpen ? (
          <ActivityIndicator size={"large"}></ActivityIndicator>
        ) : (
          <ImageViewer
            style={{
              height: height,
              flex: 1,
            }}
            backgroundColor="blue"
            renderImage={({ ...props }) => {
              props.style.backgroundColor = "purple";
              console.log(Object.keys(props), props.source.uri.length);
              return (
                <>
                  <Text>{props.source.uri.substr(0, 100)}</Text>
                  <Image {...props}></Image>
                </>
              );
            }}
            imageUrls={
              loadedPages.length === currentChapterOpen.pages.length
                ? loadedPages
                : currentChapterOpen.pages
            }
          ></ImageViewer>
        )}
      </ScrollView>
    </Modal>
  );
}
