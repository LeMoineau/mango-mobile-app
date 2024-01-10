import { Pressable, StyleSheet, Text, View } from "react-native";
import IntersiteChapter from "../../types/IntersiteChapter";
import CustomImage from "../image/CustomImage";
import { useTheme } from "@react-navigation/native";
import { style } from "../../types/primitives/Styles";

export default function ChapterItem({
  chapter,
}: {
  chapter: IntersiteChapter;
}) {
  const scraperName = Object.keys(chapter.id)[0];
  const theme = useTheme();

  return (
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
      <CustomImage uri={chapter.image[scraperName]} size={100}></CustomImage>
      <View
        style={[
          style.flexCol,
          style.justifyCenter,
          style.hFull,
          {
            paddingLeft: 10,
            flex: 3,
          },
        ]}
      >
        <Text style={{ fontWeight: "500", color: theme.colors.text }}>
          {chapter.manga.title[scraperName]}
        </Text>
        <Text style={{ color: theme.colors.text }}>
          {chapter.title[scraperName]}
        </Text>
      </View>
    </View>
  );
}
