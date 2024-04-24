import RounedButton from "@/common/components/buttons/RoundedButton";
import LoadingText from "@/common/components/text/LoadingText";
import { style } from "@/common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import { Animated, Pressable, View, useWindowDimensions } from "react-native";
import ChapterReaderMenuItem from "./ChapterReaderMenuItem";
import { useSettingsStore } from "@/common/store/settings.store";
import { PagedScrapedChapter } from "../../../../../shared/src/types/Chapter";
import { colors } from "../../../../../shared/src/config/enums/Colors";

export default function ChapterReaderMenu({
  animValue,
  shown,
  scrapedChapter,
  onRequestClose,
}: {
  animValue: Animated.Value;
  shown: boolean;
  scrapedChapter?: PagedScrapedChapter;
  onRequestClose?: () => void;
}) {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();

  const { readerHeaderHide, getNextReaderDisplayMode, setReaderOptions } =
    useSettingsStore();
  const { nextDisplayMode, nextIcon, nextLabel } = getNextReaderDisplayMode();

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
          <RounedButton
            prependIcon="close"
            prependIconStyle={[{ fontSize: 27, margin: 5 }]}
            onPress={onRequestClose}
          ></RounedButton>
        </View>
        {scrapedChapter ? (
          <>
            <RounedButton
              prependIcon="book"
              content={scrapedChapter.manga.title}
              styleProp={[{ width: "100%", justifyContent: "flex-start" }]}
            ></RounedButton>
            <RounedButton
              prependIcon="bookmark"
              content={scrapedChapter.title}
              styleProp={[
                {
                  width: "100%",
                  justifyContent: "flex-start",
                  paddingTop: 0,
                },
              ]}
            ></RounedButton>
            <RounedButton
              prependIcon="source-branch"
              content={scrapedChapter.src}
              styleProp={[
                {
                  width: "100%",
                  justifyContent: "flex-start",
                  paddingTop: 0,
                },
              ]}
            ></RounedButton>
          </>
        ) : (
          <View style={[{ paddingLeft: 15 }]}>
            <LoadingText marginBottom={5}></LoadingText>
            <LoadingText width={150} marginBottom={5}></LoadingText>
            <LoadingText width={75}></LoadingText>
          </View>
        )}
        <View style={[{ height: 30 }]}></View>
        <ChapterReaderMenuItem
          icon={nextIcon}
          label={nextLabel}
          onPress={() => {
            setReaderOptions("readerDisplayMode", nextDisplayMode);
          }}
        ></ChapterReaderMenuItem>
        <ChapterReaderMenuItem
          icon={readerHeaderHide ? "page-layout-header" : "page-layout-body"}
          label={readerHeaderHide ? "Header" : "No Header"}
          onPress={() => {
            setReaderOptions("readerHeaderHide", !readerHeaderHide);
          }}
        ></ChapterReaderMenuItem>
        <ChapterReaderMenuItem
          icon={readerHeaderHide ? "page-layout-footer" : "page-layout-body"}
          label={readerHeaderHide ? "Footer" : "No Footer"}
          onPress={() => {
            setReaderOptions("readerHeaderHide", !readerHeaderHide);
          }}
        ></ChapterReaderMenuItem>
      </Animated.View>
    </>
  );
}
