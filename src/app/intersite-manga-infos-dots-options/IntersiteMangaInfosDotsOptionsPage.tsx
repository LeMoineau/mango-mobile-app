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

export default function IntersiteMangaInfosDotsOptionsPage() {
  const navigator: useNavigationType = useNavigation();
  const route: useRouteType<"IntersiteMangaInfoDotsOptions"> = useRoute();
  const theme = useTheme();

  const openForIntersiteManga = (
    param: any
  ): param is { intersiteMangaId: string } => {
    return param && typeof param.intersiteMangaId === "string";
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
          {openForIntersiteManga(route.params) && (
            <DotsOptionsItem iconName="heart" label="LIKE"></DotsOptionsItem>
          )}
          {!openForIntersiteManga(route.params) && (
            <DotsOptionsItem iconName="book" label="READ"></DotsOptionsItem>
          )}
          <DotsOptionsItem
            iconName="earth"
            label="OPEN IN BROWSER"
            onPress={() => {
              Linking.openURL(route.params.url);
            }}
          ></DotsOptionsItem>
          {!openForIntersiteManga(route.params) && (
            <>
              <DotsOptionsItem
                iconName="file-download"
                label="DOWNLOAD"
              ></DotsOptionsItem>
            </>
          )}
          {openForIntersiteManga(route.params) && (
            <>
              <DotsOptionsItem
                iconName="playlist-add"
                label="ADD TO FAVORITES"
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
          )}
        </View>
      </Pressable>
    </>
  );
}
