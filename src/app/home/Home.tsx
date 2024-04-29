import { FlatList, View } from "react-native";
import { useFavoritesStore } from "../../common/store/favorites.store";
import ThemedText from "../../common/components/text/ThemedText";
import SearchBar from "../../common/components/form/SearchBar";
import { style } from "../../common/utils/style-utils";
import RounedButton from "../../common/components/buttons/RoundedButton";
import { useTheme } from "@react-navigation/native";
import HomeFavoritesListItem from "./components/HomeFavoritesListItem";

export default function Home() {
  const { getAll } = useFavoritesStore();
  const theme = useTheme();

  return (
    <View style={[style.flexCol, { flex: 1, paddingHorizontal: 10 }]}>
      <View style={[style.flexRow, { paddingTop: 10 }]}>
        <SearchBar placeholder="Search Favorites"></SearchBar>
        <View style={[{ width: 10 }]}></View>
        <RounedButton
          prependIcon="add"
          styleProp={[
            style.rounded,
            { backgroundColor: theme.colors.border, width: 50 },
          ]}
        ></RounedButton>
      </View>
      <View style={[{ height: 10 }]}></View>
      <FlatList
        data={getAll()}
        keyExtractor={(_, index) => `home-favList-${index}`}
        renderItem={({ item }) => (
          <HomeFavoritesListItem favList={item}></HomeFavoritesListItem>
        )}
      ></FlatList>
    </View>
  );
}
