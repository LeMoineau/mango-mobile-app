import { ScrollView, View } from "react-native";
import ChapterItem from "../common/components/item/ChapterItem";
import { useLatestChaptersStore } from "../common/store/latest-chapters.store";
import { useTheme } from "@react-navigation/native";
import { style } from "../common/types/primitives/Styles";
import { useEffect } from "react";

export default function LatestChaptersPage() {
  const latestChaptersStore = useLatestChaptersStore();
  const theme = useTheme();

  useEffect(() => {
    latestChaptersStore.fetch();
  }, []);

  return (
    <View style={[{ flex: 1 }]}>
      <ScrollView
        style={[{ backgroundColor: theme.colors.background, paddingTop: 10 }]}
        contentContainerStyle={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
        ]}
      >
        {latestChaptersStore.getAll().map((c, i) => {
          return <ChapterItem key={i} chapter={c}></ChapterItem>;
        })}
      </ScrollView>
    </View>
  );
}
