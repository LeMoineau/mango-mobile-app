import { Linking } from "react-native";
import { IntersiteMangaInfosDotsParams } from "../../../../common/types/navigation/NavigationDotsParams";
import DotsOptionsItem from "../DotsOptionsItem";
import LikeDotsOptionsItem from "../LikeDotsOptionsItem";
import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../../../common/types/navigation/NavigationTypes";
import SelectModal from "../../../../common/components/modals/primitives/SelectModal";
import useModals from "../../../../../../shared/src/hooks/use-modals";
import { SourceName } from "../../../../../../shared/src/types/primitives/Identifiers";

export function IntersiteMangaInfosDotsOptions(
  params: IntersiteMangaInfosDotsParams
) {
  const navigator: useNavigationType = useNavigation();
  const { isVisible, show, hide } = useModals<"change-src">();

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
      {params.availablesSources.length > 1 && (
        <DotsOptionsItem
          iconName="source-branch"
          label="CHANGE SOURCE"
          onPress={() => {
            show("change-src");
          }}
        ></DotsOptionsItem>
      )}
      <DotsOptionsItem
        iconName="web-sync"
        label="FORCE SCRAPING"
      ></DotsOptionsItem>
      <SelectModal
        options={params.availablesSources.map((s) => ({
          label: s,
          iconName: "source-branch",
        }))}
        alreadySelected={params.currentSource}
        visible={isVisible("change-src")}
        onRequestClose={() => hide("change-src")}
        onSelect={(src) => {
          navigator.goBack();
          navigator.navigate({
            name: "IntersiteMangaInfo",
            params: {
              intersiteMangaId: params.intersiteMangaId,
              changeSource: src as SourceName,
            },
            merge: true,
          });
        }}
      ></SelectModal>
    </>
  );
}
