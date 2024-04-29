import { Pressable, Text, View } from "react-native";
import CustomImage from "../../../common/components/image/CustomImage";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { style } from "../../../common/utils/style-utils";
import { StoredChapter } from "../../../../../shared/src/types/Chapter";
import { memo } from "react";

function ChapterItem({
  chapter,
  pressChapterTitle,
  pressChapterItem,
}: {
  chapter: StoredChapter;
  pressChapterTitle?: (chapter: StoredChapter) => void;
  pressChapterItem?: (chapter: StoredChapter) => void;
}) {
  const theme = useTheme();

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
            style.wFull,
            style.roundedSm,
            {
              overflow: "hidden",
              marginBottom: 10,
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              height: 100,
            },
          ]}
        >
          <View style={[]}>
            {chapter.image && (
              <CustomImage uri={chapter.image} size={100}></CustomImage>
            )}
            <View
              style={[
                {
                  width: 100,
                  height: 100,
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
              ]}
            >
              <LinearGradient
                colors={[theme.colors.card, "transparent"]}
                style={[{ width: "100%", height: "100%" }]}
                start={[1, 0.5]}
                end={[0, 0.5]}
                locations={[0, 1]}
              />
            </View>
          </View>
          <View
            style={[
              style.flexCol,
              style.justifyCenter,
              style.hFull,
              {
                paddingLeft: 8,
                flex: 3,
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
                }}
              >
                {chapter.manga.title}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                pressChapterTitle && pressChapterTitle(chapter);
              }}
              style={[{ flex: 1, opacity: 0.7 }]}
            >
              <Text style={{ color: theme.colors.text }}>{chapter.title}</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </>
  );
}

export default memo(ChapterItem);
