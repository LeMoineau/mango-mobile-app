import { Linking, Pressable, View } from "react-native";
import {
  useNavigationType,
  useRouteType,
} from "../../common/types/navigation/NavigationTypes";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { style } from "../../common/utils/style-utils";
import Gradient, {
  GradientDirection,
} from "../../common/components/image/Gradient";
import DotsOptionsItem from "./components/DotsOptionsItem";
import LikeDotsOptionsItem from "./components/LikeDotsOptionsItem";
import { isUUID } from "../../../../shared/src/types/primitives/Identifiers";
import { FavoritesListName } from "../../common/types/favorites/FavoritesList";
import { colors } from "../../../../shared/src/config/enums/Colors";
import { useFavoritesStore } from "../../common/store/favorites.store";
import useModals from "../../../../shared/src/hooks/use-modals";
import ConfirmModal from "../../common/components/modals/ConfirmModal";
import { DefaultValues } from "../../common/config/DefaultValues";
import TextInputModal from "../../common/components/modals/TextInputModal";
import { useEffect, useState } from "react";

export default function DotsOptionsPage() {
  const navigator: useNavigationType = useNavigation();
  const route: useRouteType<"DotsOptions"> = useRoute();
  const theme = useTheme();
  const { isVisible, show, hide } = useModals<"confirm" | "rename">();
  const {
    delete: deleteFavList,
    rename,
    intersiteMangaAlreadyIn,
    addIn,
    removeFrom,
  } = useFavoritesStore();
  const [favListName, setFavListName] = useState("");

  useEffect(() => {
    if (isFavoritesListDotsOptions(route.params)) {
      setFavListName(route.params.favoritesListName);
    }
  }, []);

  const isChapterDotsOptions = (
    param: any
  ): param is { url: string; chapterId: string } => {
    return param && isUUID(param.chapterId) && typeof param.url === "string";
  };

  const isIntersiteMangaDotsOptions = (
    param: any
  ): param is { url: string; intersiteMangaId: string } => {
    return (
      param && isUUID(param.intersiteMangaId) && typeof param.url === "string"
    );
  };

  const isFavoritesListDotsOptions = (
    param: any
  ): param is { favoritesListName: FavoritesListName } => {
    return param && typeof param.favoritesListName === "string";
  };

  return (
    <>
      <Pressable
        style={[style.flexCol, { flex: 1, justifyContent: "flex-end" }]}
        onPress={() => {
          navigator.goBack();
        }}
      >
        <Gradient
          direction={GradientDirection.BOTTOM_TO_TOP}
          height={150}
          width={"100%"}
        ></Gradient>
        <View style={[{ backgroundColor: theme.colors.background }]}>
          {isIntersiteMangaDotsOptions(route.params) ? (
            <>
              <LikeDotsOptionsItem
                intersiteMangaId={route.params.intersiteMangaId}
              ></LikeDotsOptionsItem>
              <DotsOptionsItem
                iconName="earth"
                label="OPEN IN BROWSER"
                onPress={() => {
                  if (!isIntersiteMangaDotsOptions(route.params)) return;
                  Linking.openURL(route.params.url);
                }}
              ></DotsOptionsItem>
              <DotsOptionsItem
                iconName="playlist-add"
                label="ADD TO FAVORITES"
                onPress={() => {
                  if (!isIntersiteMangaDotsOptions(route.params)) return;
                  navigator.goBack();
                  navigator.navigate("AddingInFavoritesList", {
                    intersiteMangaId: route.params.intersiteMangaId,
                  });
                }}
              ></DotsOptionsItem>
              <DotsOptionsItem
                iconName="source-branch"
                label="CHANGE SOURCE"
              ></DotsOptionsItem>
              <DotsOptionsItem
                iconName="web-sync"
                label="FORCE SCRAPING"
              ></DotsOptionsItem>
            </>
          ) : isChapterDotsOptions(route.params) ? (
            <>
              <DotsOptionsItem iconName="book" label="READ"></DotsOptionsItem>
              <DotsOptionsItem
                iconName="earth"
                label="OPEN IN BROWSER"
                onPress={() => {
                  if (!isChapterDotsOptions(route.params)) return;
                  Linking.openURL(route.params.url);
                }}
              ></DotsOptionsItem>
              <DotsOptionsItem
                iconName="file-download"
                label="DOWNLOAD"
              ></DotsOptionsItem>
            </>
          ) : isFavoritesListDotsOptions(route.params) ? (
            <>
              {route.params.canOpenListInfos && (
                <DotsOptionsItem
                  iconName="open-in-new"
                  label="OPEN INFOS"
                  onPress={async () => {
                    show("rename");
                  }}
                ></DotsOptionsItem>
              )}
              {route.params.addIntersiteMangaIn &&
                !intersiteMangaAlreadyIn(
                  favListName,
                  route.params.addIntersiteMangaIn
                ) && (
                  <DotsOptionsItem
                    iconName="push-pin"
                    label="ADD IN THIS LIST"
                    onPress={async () => {
                      if (
                        !isFavoritesListDotsOptions(route.params) ||
                        !route.params.addIntersiteMangaIn
                      )
                        return;
                      await addIn(
                        favListName,
                        route.params.addIntersiteMangaIn
                      );
                    }}
                  ></DotsOptionsItem>
                )}
              {route.params.addIntersiteMangaIn &&
                intersiteMangaAlreadyIn(
                  favListName,
                  route.params.addIntersiteMangaIn
                ) && (
                  <DotsOptionsItem
                    iconName="pin-off"
                    label="REMOVE FROM THIS LIST"
                    onPress={async () => {
                      if (
                        !isFavoritesListDotsOptions(route.params) ||
                        !route.params.addIntersiteMangaIn
                      )
                        return;
                      await removeFrom(
                        favListName,
                        route.params.addIntersiteMangaIn
                      );
                    }}
                  ></DotsOptionsItem>
                )}
              <DotsOptionsItem
                iconName="pen"
                label="RENAME"
                onPress={async () => {
                  show("rename");
                }}
              ></DotsOptionsItem>
              {favListName !== DefaultValues.LIKE_FAVORITES_LIST_NAME && (
                <DotsOptionsItem
                  iconName="trash"
                  label="DELETE"
                  iconColor={colors.red[500]}
                  onPress={async () => {
                    show("confirm");
                  }}
                ></DotsOptionsItem>
              )}
            </>
          ) : (
            <></>
          )}
        </View>
      </Pressable>
      {isFavoritesListDotsOptions(route.params) && (
        <>
          <TextInputModal
            label={`Enter the new name of "${favListName}" :`}
            visible={isVisible("rename")}
            onRequestClose={() => hide("rename")}
            onSubmit={async (text) => {
              if (!isFavoritesListDotsOptions(route.params)) return;
              await rename(favListName, text);
              setFavListName(text);
            }}
          ></TextInputModal>
          <ConfirmModal
            label={`Are you sure to you want to delete "${favListName}" list ?`}
            visible={isVisible("confirm")}
            onRequestClose={() => {
              hide("confirm");
            }}
            onConfirm={async () => {
              if (!isFavoritesListDotsOptions(route.params)) return;
              await deleteFavList(favListName);
              navigator.goBack();
            }}
          ></ConfirmModal>
        </>
      )}
    </>
  );
}
