import { Linking } from "react-native";
import { IntersiteMangaInfosDotsParams } from "../../../../common/types/navigation/NavigationDotsParams";
import DotsOptionsItem from "../DotsOptionsItem";
import LikeDotsOptionsItem from "../LikeDotsOptionsItem";
import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../../../common/types/navigation/NavigationTypes";

export function IntersiteMangaInfosDotsOptions(
  params: IntersiteMangaInfosDotsParams
) {
  const navigator: useNavigationType = useNavigation();

  return (
    <>
      <LikeDotsOptionsItem
        intersiteMangaId={params.intersiteMangaId}
      ></LikeDotsOptionsItem>
      <DotsOptionsItem
        iconName="earth"
        label="OPEN IN BROWSER"
        onPress={() => {
          Linking.openURL(params.url);
        }}
      ></DotsOptionsItem>
      <DotsOptionsItem
        iconName="playlist-add"
        label="ADD TO FAVORITES"
        onPress={() => {
          navigator.goBack();
          navigator.navigate("AddingInFavoritesList", {
            intersiteMangaId: params.intersiteMangaId,
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
  );
}
