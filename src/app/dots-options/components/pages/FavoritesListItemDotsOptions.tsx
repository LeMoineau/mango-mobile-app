import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../../../common/types/navigation/NavigationTypes";
import DotsOptionsItem from "../DotsOptionsItem";
import { useFavoritesStore } from "../../../../common/store/favorites.store";
import { DefaultValues } from "../../../../common/config/DefaultValues";
import useModals from "../../../../shared/src/hooks/use-modals";
import { useCacheStore } from "../../../../common/store/cache.store";
import { useEffect, useState } from "react";
import { colors } from "../../../../shared/src/config/enums/Colors";
import TextInputModal from "../../../../common/components/modals/primitives/TextInputModal";
import ConfirmModal from "../../../../common/components/modals/primitives/ConfirmModal";
import {
  FavoritesListItemDotsParams,
  isFavoritesListItemDotsParams,
} from "../../../../common/types/navigation/NavigationDotsParams";

export default function FavoritesListItemDotsOptions(
  params: FavoritesListItemDotsParams
) {
  const navigator: useNavigationType = useNavigation();
  const {
    delete: deleteFavList,
    rename,
    intersiteMangaAlreadyIn,
    addIn,
    removeFrom,
    clear,
  } = useFavoritesStore();
  const { isVisible, show, hide } = useModals<
    "confirm-delete" | "confirm-clear" | "rename"
  >();
  const { saveCurrentIntersiteManga } = useCacheStore();
  const [favListName, setFavListName] = useState("");

  useEffect(() => {
    setFavListName(params.favoritesListName);
  }, []);

  return (
    <>
      {params.canOpenListInfos && (
        <DotsOptionsItem
          iconName="open-in-new"
          label="OPEN INFOS"
          onPress={async () => {
            navigator.goBack();
            navigator.navigate("FavoritesListInfos", {
              favoritesListName: favListName,
            });
          }}
        ></DotsOptionsItem>
      )}
      {params.addIntersiteMangaIn &&
        !intersiteMangaAlreadyIn(favListName, params.addIntersiteMangaIn) && (
          <DotsOptionsItem
            iconName="push-pin"
            label="ADD IN THIS LIST"
            onPress={async () => {
              if (
                !isFavoritesListItemDotsParams(params) ||
                !params.addIntersiteMangaIn
              ) {
                return;
              }
              await addIn(favListName, params.addIntersiteMangaIn);
              await saveCurrentIntersiteManga();
            }}
          ></DotsOptionsItem>
        )}
      {params.addIntersiteMangaIn &&
        intersiteMangaAlreadyIn(favListName, params.addIntersiteMangaIn) && (
          <DotsOptionsItem
            iconName="pin-off"
            label="REMOVE FROM THIS LIST"
            onPress={async () => {
              if (
                !isFavoritesListItemDotsParams(params) ||
                !params.addIntersiteMangaIn
              ) {
                return;
              }
              await removeFrom(favListName, params.addIntersiteMangaIn);
            }}
          ></DotsOptionsItem>
        )}
      {favListName !== DefaultValues.LIKE_FAVORITES_LIST_NAME && (
        <DotsOptionsItem
          iconName="pen"
          label="RENAME"
          onPress={async () => {
            show("rename");
          }}
        ></DotsOptionsItem>
      )}
      <DotsOptionsItem
        iconName="clear"
        label="EMPTY THE LIST"
        onPress={async () => {
          show("confirm-clear");
        }}
      ></DotsOptionsItem>
      {favListName !== DefaultValues.LIKE_FAVORITES_LIST_NAME && (
        <DotsOptionsItem
          iconName="trash"
          label="DELETE"
          iconColor={colors.red[500]}
          onPress={async () => {
            show("confirm-delete");
          }}
        ></DotsOptionsItem>
      )}

      <TextInputModal
        label={`Enter the new name of "${favListName}" :`}
        visible={isVisible("rename")}
        onRequestClose={() => hide("rename")}
        onSubmit={async (text) => {
          await rename(favListName, text);
          setFavListName(text);
          if (params.goBackOnRename) {
            navigator.goBack();
            navigator.goBack();
          }
        }}
      ></TextInputModal>
      <ConfirmModal
        label={`Are you sure to you want to ${
          isVisible("confirm-delete") ? "delete" : "clear the"
        } "${favListName}" list ?`}
        visible={isVisible("confirm-clear") || isVisible("confirm-delete")}
        onRequestClose={() => {
          hide("confirm-clear");
          hide("confirm-delete");
        }}
        onConfirm={async () => {
          if (isVisible("confirm-delete")) {
            await deleteFavList(favListName);
            if (params.goBackOnDelete) {
              navigator.goBack();
            }
          } else if (isVisible("confirm-clear")) {
            await clear(favListName);
          }
          navigator.goBack();
        }}
      ></ConfirmModal>
    </>
  );
}
