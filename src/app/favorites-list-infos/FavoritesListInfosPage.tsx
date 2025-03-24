import { FlatList, View } from "react-native";
import { style } from "../../common/utils/style-utils";
import {
  useNavigationType,
  useRouteType,
} from "../../common/types/navigation/NavigationTypes";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFavoritesStore } from "../../common/store/favorites.store";
import IntersiteMangaItem from "../../common/components/items/IntersiteMangaItem";
import { useCacheStore } from "../../common/store/cache.store";
import useFavoritesListInfos from "./hooks/useFavoritesListInfos";
import FavoritesListInfosHeader from "./components/FavoritesListInfosHeader";
import { FavoritesListInfosStickyHeader } from "./components/FavoritesListInfosStickyHeader";
import ThemedText from "../../common/components/text/ThemedText";

export default function FavoritesListInfosPage() {
  const route: useRouteType<"FavoritesListInfos"> = useRoute();
  const navigator: useNavigationType = useNavigation();

  const { get } = useFavoritesStore();
  const { getIntersiteManga } = useCacheStore();
  const { coverIntersiteMangas } = useFavoritesListInfos(
    route.params.favoritesListName
  );

  return (
    <>
      <View style={[style.flexCol, { flex: 1 }]}>
        <FavoritesListInfosStickyHeader
          favListName={route.params.favoritesListName}
        ></FavoritesListInfosStickyHeader>
        <FlatList
          ListHeaderComponent={
            <FavoritesListInfosHeader
              favListName={route.params.favoritesListName}
              coverIntersiteMangas={coverIntersiteMangas}
            ></FavoritesListInfosHeader>
          }
          data={get(route.params.favoritesListName)?.intersiteMangaIds}
          keyExtractor={(_, index) => `favlist-intersitemanga-${index}`}
          renderItem={({ item }) => {
            const intersiteManga = getIntersiteManga(item);
            return (
              <View>
                {intersiteManga && (
                  <IntersiteMangaItem
                    height={70}
                    hasDotsBtn
                    intersiteManga={intersiteManga}
                    onDotsBtnPress={() => {
                      navigator.navigate("DotsOptions", {
                        favoritesListName: route.params.favoritesListName,
                        intersiteMangaId: item,
                      });
                    }}
                  ></IntersiteMangaItem>
                )}
              </View>
            );
          }}
          ListEmptyComponent={() => (
            <View style={[{ paddingHorizontal: 15, opacity: 0.7 }]}>
              <ThemedText>List empty...</ThemedText>
            </View>
          )}
        ></FlatList>
      </View>
    </>
  );
}
