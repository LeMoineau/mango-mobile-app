import RoundedButton from "./../../../../common/components/buttons/RoundedButton";
import LoadingText from "./../../../../common/components/text/LoadingText";
import { style } from "./../../../../common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import { Animated, Linking, View, useWindowDimensions } from "react-native";
import ChapterReaderMenuItem from "../ChapterReaderMenuItem";
import { useSettingsStore } from "./../../../../common/store/settings.store";
import { PagedScrapedChapter } from "../../../../shared/src/types/basics/Chapter";
import useChapterReaderMenu from "./use-chapter-reader-menu";

export default function ChapterReaderMenu({
  animValue,
  scrapedChapter,
  onRequestClose,
}: {
  animValue: Animated.Value;
  scrapedChapter?: PagedScrapedChapter;
  onRequestClose?: () => void;
}) {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();

  const { get, set } = useSettingsStore();
  const { getCurrentChapterReaderInfos, getNextChapterReaderDisplayMode } =
    useChapterReaderMenu();

  return (
    <>
      <Animated.View
        style={[
          style.flexCol,
          {
            position: "absolute",
            top: 0,
            right: 0,
            width: width * 0.7,
            height: height,
            backgroundColor: theme.colors.card,
            borderLeftColor: theme.colors.border,
            borderLeftWidth: 2,
            zIndex: 15,
            transform: [
              {
                translateX: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width * 0.7, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[style.flexRow, style.itemsCenter, {}]}>
          <RoundedButton
            prependIcon="close"
            prependIconStyle={[{ fontSize: 27, margin: 5 }]}
            onPress={onRequestClose}
          ></RoundedButton>
        </View>
        {scrapedChapter ? (
          <>
            <RoundedButton
              prependIcon="book"
              content={scrapedChapter.manga.title}
              styleProp={[{ width: "100%", justifyContent: "flex-start" }]}
            ></RoundedButton>
            <RoundedButton
              prependIcon="bookmark"
              content={scrapedChapter.title}
              styleProp={[
                {
                  width: "100%",
                  justifyContent: "flex-start",
                  paddingTop: 0,
                },
              ]}
            ></RoundedButton>
            <RoundedButton
              prependIcon="source-branch"
              content={scrapedChapter.src}
              contentStyle={[{ textDecorationLine: "underline" }]}
              styleProp={[
                {
                  width: "100%",
                  justifyContent: "flex-start",
                  paddingTop: 0,
                },
              ]}
              onPress={() => {
                Linking.openURL(scrapedChapter.url);
              }}
            ></RoundedButton>
          </>
        ) : (
          <View style={[{ paddingLeft: 15 }]}>
            <LoadingText marginBottom={5}></LoadingText>
            <LoadingText width={150} marginBottom={5}></LoadingText>
            <LoadingText width={75}></LoadingText>
          </View>
        )}
        <View style={[{ height: 30 }]}></View>
        {
          <ChapterReaderMenuItem
            icon={getCurrentChapterReaderInfos().icon}
            label={getCurrentChapterReaderInfos().label}
            onPress={() => {
              set(
                "chapterReaderDisplayMode",
                getNextChapterReaderDisplayMode()
              );
            }}
          ></ChapterReaderMenuItem>
        }
        <ChapterReaderMenuItem
          icon={
            get("chapterReaderHasHeader")
              ? "page-layout-header"
              : "page-layout-body"
          }
          label={get("chapterReaderHasHeader") ? "Header" : "No Header"}
          onPress={() => {
            set("chapterReaderHasHeader", !get("chapterReaderHasHeader"));
          }}
        ></ChapterReaderMenuItem>
        <ChapterReaderMenuItem
          icon={
            get("chapterReaderHasFooter")
              ? "page-layout-footer"
              : "page-layout-body"
          }
          label={get("chapterReaderHasFooter") ? "Footer" : "No Footer"}
          onPress={() => {
            set("chapterReaderHasFooter", !get("chapterReaderHasFooter"));
          }}
        ></ChapterReaderMenuItem>
      </Animated.View>
    </>
  );
}
