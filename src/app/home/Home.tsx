import { FlatList, View } from "react-native";
import SearchBar from "../../common/components/form/SearchBar";
import { style } from "../../common/utils/style-utils";
import RoundedButton from "../../common/components/buttons/RoundedButton";
import { useTheme } from "@react-navigation/native";
import HomeFavoritesListItem from "./components/HomeFavoritesListItem";
import useHome from "./hooks/useHome";
import useModals from "../../../../shared/src/hooks/use-modals";
import CreateFavoritesListModal from "../../common/components/modals/favorites/CreateFavoritesListModal";

export default function Home() {
  const { favorites, fetchIntersiteManga, scrapeMangas, searchFavoritesLists } =
    useHome();
  const { isVisible, show, hide } = useModals<"create-favlist">();
  const theme = useTheme();

  return (
    <View style={[style.flexCol, { flex: 1, paddingHorizontal: 10 }]}>
      <View style={[style.flexRow, { paddingTop: 10 }]}>
        <SearchBar
          placeholder="Search Favorites"
          onSubmit={(text) => {
            searchFavoritesLists(text);
          }}
          submitOnClear
        ></SearchBar>
        <View style={[{ width: 10 }]}></View>
        <RoundedButton
          prependIcon="add"
          styleProp={[
            style.rounded,
            { backgroundColor: theme.colors.border, width: 50 },
          ]}
          onPress={() => show("create-favlist")}
        ></RoundedButton>
      </View>
      <View style={[{ height: 10 }]}></View>
      <FlatList
        data={favorites}
        keyExtractor={(_, index) => `home-favList-${index}`}
        renderItem={({ item }) => (
          <HomeFavoritesListItem
            favList={item}
            onNoIntersiteManga={async (intersiteMangaId) => {
              await fetchIntersiteManga(intersiteMangaId);
            }}
            onImageError={async (src) => {
              await scrapeMangas(src);
            }}
          ></HomeFavoritesListItem>
        )}
        ListFooterComponent={() => <View style={[{ height: 90 }]}></View>}
      ></FlatList>
      <CreateFavoritesListModal
        visible={isVisible("create-favlist")}
        onRequestClose={() => hide("create-favlist")}
      ></CreateFavoritesListModal>
    </View>
  );
}
