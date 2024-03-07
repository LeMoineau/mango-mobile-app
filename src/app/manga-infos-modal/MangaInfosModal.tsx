import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ModalProps,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { style } from "../../common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import useApi from "../../common/hooks/use-api";
import Config from "../../common/config/Config";
import { useSettingsStore } from "../../common/store/settings.store";
import { LinearGradient } from "expo-linear-gradient";
import Title from "../../common/components/text/Title";
// import { colors } from "./../../../../shared/utils/color-utils";
import MangaChapterItem from "./elements/MangaChapterItem";
import { useMangaModal } from "../../common/store/manga-modal.store";
import { useChapterReaderModal } from "../../common/store/chapter-reader-modal.store";
import {
  FormattedName,
  MangaId,
} from "./../../../../shared/types/primitives/id";
import ChapterViewer from "./../../../../shared/types/chapterViewer";

export default function MangaInfosModal({
  formattedName,
  ...props
}: { formattedName?: FormattedName } & ModalProps) {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();

  const { getMoreTrustedIn } = useSettingsStore();
  const { currentMangaOpen } = useMangaModal();
  const { open } = useChapterReaderModal();
  const { fetch } = useApi<ChapterViewer>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );

  return (
    <Modal animationType="slide" {...props}>
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
        {currentMangaOpen && (
          <Image
            source={{
              uri: getMoreTrustedIn<string>(currentMangaOpen.image)[1],
            }}
            style={[
              {
                width: "100%",
                height: 300,
              },
            ]}
          ></Image>
        )}
      </View>
      <ScrollView
        style={[
          {
            flex: 1,
            padding: 0,
            backgroundColor: "transparent",
          },
        ]}
        stickyHeaderIndices={[1]}
      >
        {currentMangaOpen && (
          <>
            <LinearGradient
              colors={[theme.colors.background, "transparent"]}
              style={[{ width: "100%", height: 300 }]}
              start={[0.5, 1]}
              end={[0.5, 0]}
              locations={[0, 1]}
            />
            <View
              style={[
                {
                  paddingHorizontal: 10,
                  backgroundColor: theme.colors.background,
                },
              ]}
            >
              <Title
                styleProps={[
                  style.text2Xl,
                  style.textBold,
                  { marginVertical: 0, paddingHorizontal: 0 },
                ]}
              >
                {getMoreTrustedIn<string>(currentMangaOpen.name)[1]}
              </Title>
              <Text style={[{ color: theme.colors.text }]}>
                {getMoreTrustedIn<string>(currentMangaOpen.author)[1]}
              </Text>
              <Title styleProps={[{ fontSize: 15, marginTop: 30 }]}>
                Chapters
              </Title>
              <SafeAreaView>
                <FlatList
                  data={currentMangaOpen.chapters.sort(
                    (a, b) =>
                      -Number(a.formattedNumber) + Number(b.formattedNumber)
                  )}
                  keyExtractor={(_, index) => `manga-chapter-item-${index}`}
                  renderItem={({ item, index }) => (
                    <MangaChapterItem
                      key={index}
                      chapter={item}
                      pressReadBtn={() => {
                        const [src, id] = getMoreTrustedIn<MangaId>(item.id);
                        if (!src || !id) return;
                        open(currentMangaOpen.formattedName, src, id, fetch);
                      }}
                    ></MangaChapterItem>
                  )}
                ></FlatList>
              </SafeAreaView>
            </View>
          </>
        )}
        {!currentMangaOpen && (
          <ActivityIndicator size={"large"}></ActivityIndicator>
        )}
      </ScrollView>
    </Modal>
  );
}
