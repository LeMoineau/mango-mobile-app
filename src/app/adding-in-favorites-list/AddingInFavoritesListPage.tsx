import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import {
  useNavigationType,
  useRouteType,
} from "../../common/types/navigation/NavigationTypes";
import { View } from "react-native";
import { useFavoritesStore } from "../../common/store/favorites.store";
import FavoritesListItem from "../../common/components/items/FavoritesListItem";
import RoundedButton from "../../common/components/buttons/RoundedButton";
import { style } from "../../common/utils/style-utils";
import useModals from "../../shared/src/hooks/use-modals";
import { colors } from "../../shared/src/config/enums/Colors";
import CustomPageHeader from "../../common/components/navigation/CustomPageHeader";
import CreateFavoritesListModal from "../../common/components/modals/favorites/CreateFavoritesListModal";
import { useCacheStore } from "../../common/store/cache.store";
import { useSettingsStore } from "../../common/store/settings.store";

export default function AddingInFavoritesListPage() {
  const route: useRouteType<"AddingInFavoritesList"> = useRoute();
  const navigator: useNavigationType = useNavigation();

  const { getAll, addIn, intersiteMangaAlreadyIn } = useFavoritesStore();
  const { saveCurrentIntersiteManga } = useCacheStore();
  const { get } = useSettingsStore();

  const theme = useTheme();
  const { isVisible, show, hide } = useModals<"text-input">();
  return (
    <View
      style={[
        style.flexCol,
        style.itemsCenter,
        { flex: 1, backgroundColor: theme.colors.background },
      ]}
    >
      <CustomPageHeader title="Add to Favorites List"></CustomPageHeader>
      <View style={[{ height: 40 }]}></View>
      <RoundedButton
        prependIcon="playlist-add"
        content="New Favorites List"
        contentStyle={[{ fontWeight: "500", fontSize: 15 }]}
        styleProp={[{ backgroundColor: theme.colors.primary }]}
        color={colors.white}
        onPress={() => {
          show("text-input");
        }}
      ></RoundedButton>
      <View style={[{ height: 20 }]}></View>
      {getAll().map((favList, index) => (
        <FavoritesListItem
          favoritesList={favList}
          nameDisabled={intersiteMangaAlreadyIn(
            favList.name,
            route.params.intersiteMangaId
          )}
          key={`favList-${index}`}
          onItemPress={async () => {
            if (
              intersiteMangaAlreadyIn(
                favList.name,
                route.params.intersiteMangaId
              )
            ) {
              return;
            }
            await addIn(favList.name, route.params.intersiteMangaId);
            await saveCurrentIntersiteManga();
            if (get("notClosingAfterAddingMangaInList") === true) return;
            navigator.goBack();
          }}
          onDotsBtnPress={() => {
            navigator.navigate({
              name: "DotsOptions",
              params: {
                favoritesListName: favList.name,
                addIntersiteMangaIn: route.params.intersiteMangaId,
              },
            });
          }}
        ></FavoritesListItem>
      ))}
      <CreateFavoritesListModal
        visible={isVisible("text-input")}
        onRequestClose={() => hide("text-input")}
      ></CreateFavoritesListModal>
    </View>
  );
}
