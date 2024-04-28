import { View } from "react-native";
import { useFavoritesStore } from "../../common/store/favorites.store";
import ThemedText from "../../common/components/text/ThemedText";

export default function Home() {
  const { getAll } = useFavoritesStore();
  return (
    <View style={[{ flex: 1, paddingHorizontal: 10 }]}>
      {getAll().map((favList, index) => (
        <View key={`favList-${index}`}>
          <ThemedText>
            {favList.name}, {JSON.stringify(favList.intersiteMangaIds)}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}
