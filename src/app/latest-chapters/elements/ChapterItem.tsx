import { Pressable, Text, View } from "react-native";
import CustomImage from "../../../common/components/image/CustomImage";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import IntersiteChapter from "../../../common/types/intersite/IntersiteChapter";
import { IntersiteField } from "../../../common/types/intersite/IntersiteField";
import { ChapterId } from "../../../common/types/primitives/Ids";
import { style } from "../../../common/utils/style-utils";

export default function ChapterItem({
  chapter,
  pressChapterTitle,
  pressChapterItem,
}: {
  chapter: IntersiteChapter;
  pressChapterTitle?: (chapter: IntersiteChapter) => void;
  pressChapterItem?: (chapter: IntersiteChapter) => void;
}) {
  const SourceName = Object.keys(chapter.id)[0];
  const theme = useTheme();

  return (
    <Pressable onPress={() => pressChapterItem && pressChapterItem(chapter)}>
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
          <CustomImage uri={chapter.image[SourceName]} size={100}></CustomImage>
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
          <Text style={{ fontWeight: "500", color: theme.colors.text }}>
            {chapter.manga.title[SourceName]}
          </Text>
          <Pressable
            onPress={() => pressChapterTitle && pressChapterTitle(chapter)}
          >
            <Text style={{ color: theme.colors.text }}>
              {chapter.title[SourceName]}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
