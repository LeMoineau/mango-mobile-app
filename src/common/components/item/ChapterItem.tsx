import { Text, View } from "react-native";
import IntersiteChapter from "../../types/IntersiteChapter";
import CustomImage from "../image/CustomImage";
import { useTheme } from "@react-navigation/native";
import { style } from "../../types/primitives/Styles";
import { LinearGradient } from "expo-linear-gradient";

export default function ChapterItem({
  chapter,
}: {
  chapter: IntersiteChapter;
}) {
  const SourceName = Object.keys(chapter.id)[0];
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
      <View style={[]}>
        <CustomImage uri={chapter.image[SourceName]} size={100}></CustomImage>
        <View
          style={[
            { width: 100, height: 100, position: "absolute", top: 0, left: 0 },
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

        <Text style={{ color: theme.colors.text }}>
          {chapter.title[SourceName]}
        </Text>
      </View>
    </View>
  );
}
