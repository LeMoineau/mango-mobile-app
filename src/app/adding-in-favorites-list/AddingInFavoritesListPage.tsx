import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import {
  useNavigationType,
  useRouteType,
} from "../../common/types/navigation/NavigationTypes";
import { View } from "react-native";
import ThemedText from "../../common/components/text/ThemedText";
import { useFavoritesStore } from "../../common/store/favorites.store";
import FavoritesListItem from "../../common/components/items/FavoritesListItem";
import RounedButton from "../../common/components/buttons/RoundedButton";
import { style } from "../../common/utils/style-utils";
import TextInputModal from "../../common/components/modals/TextInputModal";
import useModals from "../../../../shared/src/hooks/use-modals";
import { colors } from "../../../../shared/src/config/enums/Colors";

export default function AddingInFavoritesListPage() {
  const route: useRouteType<"AddingInFavoritesList"> = useRoute();
  const navigator: useNavigationType = useNavigation();

  const { create, getAll, addIn, intersiteMangaAlreadyIn } =
    useFavoritesStore();

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
      <View style={[style.flexRow, style.itemsCenter, {}]}>
        <RounedButton
          prependIcon="arrow-back"
          prependIconStyle={[{ fontSize: 25 }]}
          styleProp={[{ position: "absolute", left: 10, zIndex: 5 }]}
          onPress={() => {
            navigator.goBack();
          }}
        ></RounedButton>
        <ThemedText
          style={[
            style.textCenter,
            { fontWeight: "500", flex: 1, fontSize: 17, paddingVertical: 10 },
          ]}
        >
          Add to Favorites List
        </ThemedText>
      </View>
      <View style={[{ height: 40 }]}></View>
      <RounedButton
        prependIcon="playlist-add"
        content="New Favorites List"
        contentStyle={[{ fontWeight: "500", fontSize: 15 }]}
        styleProp={[{ backgroundColor: theme.colors.primary }]}
        color={colors.white}
        onPress={() => {
          show("text-input");
        }}
      ></RounedButton>
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
      <TextInputModal
        visible={isVisible("text-input")}
        label="Enter the new favorites list name :"
        onRequestClose={() => {
          hide("text-input");
        }}
        onSubmit={async (name) => {
          console.log(name);
          if (name.length > 0) {
            await create(name);
          }
        }}
      ></TextInputModal>
    </View>
  );
}
