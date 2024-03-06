import {
  ActivityIndicator,
  Image,
  Modal,
  ModalProps,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { style } from "../../common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import IntersiteChapter from "../../common/types/intersite/IntersiteChapter";
import useApi from "../../common/hooks/use-api";
import Config from "../../common/config/Config";
import ChapterViewer from "../../common/types/chapterViewer";
import { useSettingsStore } from "../../common/store/settings.store";
import { ImageUtils } from "../../common/utils/image-utils";
import { IntersiteManga } from "../../common/types/intersite/IntersiteManga";
import { FormattedName } from "../../common/types/primitives/Ids";
import Manga from "../../common/types/manga";
import { LinearGradient } from "expo-linear-gradient";
import Title from "../../common/components/text/Title";
import ExpoIcon from "../../common/components/icons/ExpoIcon";
import { colors } from "../../common/utils/color-utils";
import MangaChapterItem from "./elements/MangaChapterItem";

export default function MangaInfosModal({
  formattedName,
  ...props
}: { formattedName?: FormattedName } & ModalProps) {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const { loading, data, fetch } = useApi<IntersiteManga>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );
  const { getMoreTrustedIn } = useSettingsStore();

  useEffect(() => {
    if (formattedName) {
      fetch(`/mangas/${formattedName}`, true);
    }
  }, [formattedName]);

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
        {data && (
          <Image
            source={{ uri: getMoreTrustedIn(data.image)[1] }}
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
            backgroundColor: colors.transparent,
          },
        ]}
      >
        {data && (
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
                {getMoreTrustedIn(data.name)[1]}
              </Title>
              <Text style={[{ color: theme.colors.text }]}>
                {getMoreTrustedIn(data.author)[1]}
              </Text>
              <Title styleProps={[{ fontSize: 15, marginTop: 30 }]}>
                Chapters
              </Title>
              {data.chapters
                .sort(
                  (a, b) =>
                    -Number(a.formattedNumber) + Number(b.formattedNumber)
                )
                .map((c, index) => {
                  return (
                    <MangaChapterItem
                      key={index}
                      chapter={c}
                    ></MangaChapterItem>
                  );
                })}
            </View>
          </>
        )}
        {loading && <ActivityIndicator size={"large"}></ActivityIndicator>}
      </ScrollView>
    </Modal>
  );
}
