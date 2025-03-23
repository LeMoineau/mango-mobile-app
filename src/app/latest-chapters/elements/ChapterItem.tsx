import { Pressable, Text, useWindowDimensions, View } from "react-native";
import CustomImage from "../../../common/components/image/CustomImage";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { style } from "../../../common/utils/style-utils";
import { StoredChapter } from "../../../shared/src/types/basics/Chapter";
import { memo } from "react";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import { DefaultValues } from "../../../common/config/DefaultValues";
import { LanguagesUtils } from "../../../common/utils/languages-utils";

function ChapterItem({
  chapter,
  coverCard,
  pressChapterTitle,
  pressChapterItem,
}: {
  chapter: StoredChapter;
  coverCard?: boolean;
  pressChapterTitle?: (chapter: StoredChapter) => void;
  pressChapterItem?: (chapter: StoredChapter) => void;
}) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const coverCardWidth = width * 0.3;
  const coverCardHeight =
    (DefaultValues.COVER_CARD_STYLE_HEIGHT * coverCardWidth) /
    DefaultValues.COVER_CARD_STYLE_WIDTH;

  return (
    <>
      <Pressable
        onPress={() => {
          pressChapterItem && pressChapterItem(chapter);
        }}
      >
        <View
          style={[
            style.flexRow,
            style.border,
            style.roundedSm,
            {
              overflow: "hidden",
              marginBottom: 10,
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              height: !coverCard ? 100 : coverCardHeight,
              width: !coverCard ? "100%" : coverCardWidth,
            },
          ]}
        >
          <View style={[]}>
            <View
              style={[
                {
                  width: coverCard ? coverCardWidth : 100,
                  height: coverCard ? coverCardHeight : 100,
                },
              ]}
            >
              {chapter.image ? (
                <CustomImage uri={chapter.image} size={"100%"}></CustomImage>
              ) : (
                <View
                  style={[
                    style.flexCol,
                    style.justifyCenter,
                    style.itemsCenter,
                    {
                      backgroundColor: theme.colors.text,
                      opacity: 0.7,
                      width: "100%",
                      height: "100%",
                    },
                  ]}
                >
                  <ExpoIcon
                    color={theme.colors.background}
                    size={40}
                    name="image-broken-variant"
                  ></ExpoIcon>
                </View>
              )}
            </View>
            <View
              style={[
                {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
              ]}
            >
              <LinearGradient
                colors={[theme.colors.card, "transparent"]}
                style={[{ width: "100%", height: "100%" }]}
                start={coverCard ? [0.5, 1] : [1, 0.5]}
                end={coverCard ? [0.5, 0] : [0, 0.5]}
                locations={[0, 1]}
              />
            </View>
          </View>
          <View
            style={[
              style.flexCol,
              style.justifyCenter,

              {
                paddingLeft: coverCard ? undefined : 8,
                paddingHorizontal: coverCard ? 4 : undefined,
                paddingBottom: coverCard ? 4 : undefined,
                flex: 3,
                position: coverCard ? "absolute" : undefined,
                width: coverCard ? "100%" : undefined,
                bottom: coverCard ? 0 : undefined,
                height: coverCard ? undefined : "100%",
              },
            ]}
          >
            <View
              style={[
                style.flexCol,
                {
                  justifyContent: "flex-end",
                  flex: 1,
                },
              ]}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: theme.colors.text,
                  fontSize: coverCard ? 11 : undefined,
                }}
                numberOfLines={2}
              >
                {`${chapter.manga.title}${
                  !coverCard
                    ? " " + LanguagesUtils.getFlagForLang(chapter.lang)
                    : ""
                }`}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                pressChapterTitle && pressChapterTitle(chapter);
              }}
              style={[{ flex: 1, opacity: 0.7 }]}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: coverCard ? 11 : undefined,
                }}
                numberOfLines={2}
              >
                {chapter.title}
              </Text>
            </Pressable>
          </View>
          {/* <LinearGradient
            colors={[theme.colors.card, "transparent"]}
            style={[
              {
                width: "100%",
                height: 20,
                position: "absolute",
                top: 0,
                left: 0,
              },
            ]}
            start={coverCard ? [0.92, 0] : [1, 0.5]}
            end={coverCard ? [0.9, 1] : [0, 0.5]}
            locations={[0.4, 1]}
          /> */}
          {coverCard && (
            <View
              style={[
                style.roundedFull,
                {
                  position: "absolute",
                  top: 0,
                  right: 0,
                },
              ]}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: coverCard ? 11 : undefined,
                  paddingRight: 5,
                  paddingTop: 3,
                  paddingBottom: 10,
                  paddingLeft: 10,
                }}
                numberOfLines={2}
              >
                {LanguagesUtils.getFlagForLang(chapter.lang)}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    </>
  );
}

export default memo(ChapterItem);
