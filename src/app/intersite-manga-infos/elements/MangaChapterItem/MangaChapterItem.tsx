import { Animated, Image, Pressable, View } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import ExpoIcon from "../../../../common/components/icons/ExpoIcon";
import { memo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import RoundedButton from "../../../../common/components/buttons/RoundedButton";
import { colors } from "../../../../shared/src/config/enums/Colors";
import useAnimatedValue from "../../../../common/hooks/use-animated-value";
import { IdentifiedChapter } from "../../../../shared/src/types/basics/Chapter";
import ThemedText from "../../../../common/components/text/ThemedText";
import IconedText from "../../../../common/components/text/IconedText";
import ChapterDownloadButton from "./../../../../common/components/buttons/ChapterDownloadButton";
import { useDownloaderStore } from "../../../../common/store/downloader.store";

function MangaChapterItem({
  chapter,
  pressReadBtn,
  pressDotsBtn,
}: {
  chapter: IdentifiedChapter;
  pressReadBtn?: (chapter: IdentifiedChapter) => void;
  pressDotsBtn?: (chapter: IdentifiedChapter) => void;
}) {
  const theme = useTheme();

  const { animValue, enable, setEnabled } = useAnimatedValue({ duration: 250 });
  const [downloadingProgress, setDownloadingProgress] = useState(0);
  const { isDownloaded } = useDownloaderStore();

  return (
    <>
      <View style={[{ backgroundColor: theme.colors.background }]}>
        <Animated.View
          style={[
            style.border,
            style.roundedSm,
            style.flexCol,
            style.overflowHidden,
            {
              marginBottom: 10,
              height: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [70, 140],
              }),
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              marginHorizontal: 10,
            },
          ]}
        >
          <View>
            <View
              style={[
                {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: 70,
                  width: 70,
                },
              ]}
            >
              <Image
                source={{ uri: chapter?.image }}
                style={[
                  {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  },
                ]}
              ></Image>
              <LinearGradient
                colors={[theme.colors.card, "transparent"]}
                style={[{ width: "100%", height: "100%" }]}
                start={[1, 0.5]}
                end={[0, 0.5]}
                locations={[0, 1]}
              />
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: animValue,
                    width: "100%",
                    height: "100%",
                  },
                ]}
              >
                <LinearGradient
                  colors={[theme.colors.card, "transparent"]}
                  style={[
                    {
                      width: "100%",
                      height: "100%",
                    },
                  ]}
                  start={[0.5, 1]}
                  end={[0.5, 0]}
                  locations={[0, 0.2]}
                />
              </Animated.View>
            </View>
            <Pressable
              style={[
                {
                  paddingLeft: chapter?.image ? 70 : 0,
                },
              ]}
              onPress={() => setEnabled(!enable)}
            >
              <View
                style={[
                  style.flexRow,
                  style.justifyBetween,
                  style.itemsCenter,
                  {
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    height: 70,
                  },
                ]}
              >
                <View
                  style={[
                    style.overflowHidden,
                    {
                      flex: 1,
                      paddingRight: 10,
                    },
                  ]}
                >
                  <View style={[style.flexRow, style.itemsCenter, {}]}>
                    <ThemedText style={[{ opacity: 0.8 }]}>
                      {`${chapter?.title} `}
                    </ThemedText>
                    {chapter && isDownloaded(chapter.id) && (
                      <ExpoIcon
                        name="check-circle"
                        color={colors.green[500]}
                        size={17}
                      ></ExpoIcon>
                    )}
                  </View>
                  <View style={[style.flexRow, {}]}>
                    <IconedText
                      fontSize={10}
                      style={[{ opacity: 0.5 }]}
                      iconName="source-branch"
                    >
                      {chapter?.src}
                    </IconedText>
                    {chapter?.releaseDate && (
                      <>
                        <View style={[{ width: 10 }]}></View>
                        <ThemedText
                          style={[
                            {
                              opacity: 0.5,
                              fontSize: 10,
                            },
                          ]}
                        >
                          {new Date(chapter?.releaseDate!).toDateString()}
                        </ThemedText>
                      </>
                    )}
                  </View>
                </View>
                <View style={[style.flexRow, style.itemsCenter, {}]}>
                  <ExpoIcon
                    name={!enable ? "angle-down" : "angle-up"}
                    color={theme.colors.text}
                    size={25}
                    styleProps={{ opacity: 0.7 }}
                  ></ExpoIcon>
                </View>
              </View>
            </Pressable>
          </View>
          {
            <Animated.View
              style={[
                style.flexRow,
                style.itemsCenter,
                {
                  flex: 1,
                  justifyContent: "flex-end",
                  paddingRight: 10,
                  opacity: animValue,
                },
              ]}
            >
              <View style={[style.flexRow, style.itemsCenter, {}]}>
                {chapter && (
                  <ChapterDownloadButton
                    chapter={chapter}
                    onProgress={(progress) => {
                      setDownloadingProgress(progress);
                    }}
                  ></ChapterDownloadButton>
                )}
                <View style={[{ width: 10 }]}></View>
                <RoundedButton
                  content="READ"
                  contentStyle={[style.textBold, { color: colors.white }]}
                  appendIcon="book"
                  appendIconStyle={[{ color: colors.white }]}
                  styleProp={[{ backgroundColor: theme.colors.primary }]}
                  onPress={() =>
                    pressReadBtn && chapter && pressReadBtn(chapter)
                  }
                ></RoundedButton>
                <View style={[{ width: 10 }]}></View>
                <RoundedButton
                  appendIcon="dots-vertical"
                  styleProp={[{ backgroundColor: theme.colors.border }]}
                  onPress={() =>
                    pressDotsBtn && chapter && pressDotsBtn(chapter)
                  }
                ></RoundedButton>
              </View>
            </Animated.View>
          }
          {downloadingProgress < 0.99 && (
            <View
              style={[
                {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  backgroundColor: colors.green[700],
                  height: 2,
                  width: `${downloadingProgress * 100}%`,
                },
              ]}
            ></View>
          )}
        </Animated.View>
      </View>
    </>
  );
}

export default memo(MangaChapterItem);
