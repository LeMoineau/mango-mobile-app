import { useNavigation } from "@react-navigation/native";
import { useFavoritesStore } from "../../../../common/store/favorites.store";
import { IntersiteMangaInFavoritesListDotsParams } from "../../../../common/types/navigation/NavigationDotsParams";
import { useNavigationType } from "../../../../common/types/navigation/NavigationTypes";
import DotsOptionsItem from "../DotsOptionsItem";

export default function IntersiteMangaInFavoritesListDotsOptions(
  params: IntersiteMangaInFavoritesListDotsParams
) {
  const navigator: useNavigationType = useNavigation();
  const { intersiteMangaAlreadyIn, removeFrom } = useFavoritesStore();

  return (
    <>
      <DotsOptionsItem
        iconName="open-in-new"
        label="OPEN INFOS"
        onPress={() => {
          navigator.goBack();
          navigator.navigate("IntersiteMangaInfo", {
            intersiteMangaId: params.intersiteMangaId,
          });
        }}
      ></DotsOptionsItem>
      {intersiteMangaAlreadyIn(
        params.favoritesListName,
        params.intersiteMangaId
      ) && (
        <DotsOptionsItem
          iconName="pin-off"
          label="REMOVE FROM LIST"
          onPress={async () => {
            await removeFrom(params.favoritesListName, params.intersiteMangaId);
            navigator.goBack();
          }}
        ></DotsOptionsItem>
      )}
    </>
  );
}
