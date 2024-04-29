import { Pressable, View } from "react-native";
import {
  useNavigationType,
  useRouteType,
} from "../../common/types/navigation/NavigationTypes";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { style } from "../../common/utils/style-utils";
import Gradient, {
  GradientDirection,
} from "../../common/components/image/Gradient";
import {
  isChapterDotsOptions,
  isFavoritesListItemDotsParams,
  isIntersiteMangaDotsOptions,
  isIntersiteMangaInFavoritesListDotsParams,
} from "../../common/types/navigation/NavigationDotsParams";
import { IntersiteMangaInfosDotsOptions } from "./components/pages/IntersiteMangaInfosDotsOptions";
import ChapterItemDotsOptions from "./components/pages/ChapterItemDotsOptions";
import FavoritesListItemDotsOptions from "./components/pages/FavoritesListItemDotsOptions";
import IntersiteMangaInFavoritesListDotsOptions from "./components/pages/IntersiteMangaInFavoritesListDotsOptions";

export default function DotsOptionsPage() {
  const navigator: useNavigationType = useNavigation();
  const route: useRouteType<"DotsOptions"> = useRoute();
  const theme = useTheme();

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
            <IntersiteMangaInfosDotsOptions
              {...route.params}
            ></IntersiteMangaInfosDotsOptions>
          ) : isChapterDotsOptions(route.params) ? (
            <ChapterItemDotsOptions {...route.params}></ChapterItemDotsOptions>
          ) : isFavoritesListItemDotsParams(route.params) ? (
            <FavoritesListItemDotsOptions
              {...route.params}
            ></FavoritesListItemDotsOptions>
          ) : isIntersiteMangaInFavoritesListDotsParams(route.params) ? (
            <IntersiteMangaInFavoritesListDotsOptions
              {...route.params}
            ></IntersiteMangaInFavoritesListDotsOptions>
          ) : (
            <></>
          )}
        </View>
      </Pressable>
    </>
  );
}
