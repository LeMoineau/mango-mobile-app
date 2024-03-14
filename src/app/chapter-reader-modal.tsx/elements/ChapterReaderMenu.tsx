import RounedButton from "@/common/components/buttons/RoundedButton";
import LoadingText from "@/common/components/text/LoadingText";
import { style } from "@/common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import ChapterViewer from "@shared/types/chapterViewer";
import { useEffect, useRef } from "react";
import { Animated, View, useWindowDimensions } from "react-native";
import ChapterReaderMenuItem from "./ChapterReaderMenuItem";
import { useSettingsStore } from "@/common/store/settings.store";

export default function ChapterReaderMenu({
  shown,
  chapterViewer,
  onRequestClose,
}: {
  shown: boolean;
  chapterViewer?: ChapterViewer;
  onRequestClose?: () => void;
}) {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();

  const { readerHeaderHide, getNextReaderDisplayMode, setReaderOptions } =
    useSettingsStore();
  const translateX = useRef(new Animated.Value(0)).current;
  const { nextDisplayMode, nextIcon, nextLabel } = getNextReaderDisplayMode();

  useEffect(() => {
    if (shown) {
      Animated.timing(translateX, {
        toValue: 1,
        delay: 150,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: 0,
        delay: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [shown]);

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
                translateX: translateX.interpolate({
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
        {chapterViewer ? (
          <>
            <RounedButton
              prependIcon="book"
              content={chapterViewer.manga.name}
              styleProp={[{ width: "100%", justifyContent: "flex-start" }]}
            ></RounedButton>
            <RounedButton
              prependIcon="bookmark"
              content={chapterViewer.title}
              styleProp={[
                { width: "100%", justifyContent: "flex-start", paddingTop: 0 },
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
      </Animated.View>
    </>
  );
}
