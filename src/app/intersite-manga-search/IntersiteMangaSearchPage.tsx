import { ActivityIndicator, FlatList, View } from "react-native";
import { useRouteType } from "../../common/types/navigation/NavigationTypes";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import useIntersiteMangaSearch from "./hooks/useIntersiteMangaSearch";
import IntersiteMangaItem from "../../common/components/items/IntersiteMangaItem";
import SearchBar from "../../common/components/form/SearchBar";
import RoundedButton from "../../common/components/buttons/RoundedButton";
import { style } from "../../common/utils/style-utils";

export default function IntersiteMangaSearchPage() {
  const route: useRouteType<"IntersiteMangaSearch"> = useRoute();

  const { intersiteMangas, fullyLoaded, loading, fetchNewQuery, fetchQuery } =
    useIntersiteMangaSearch();

  useEffect(() => {
    fetchNewQuery(route.params.query);
  }, []);

  return (
    <>
      <View style={[{ flex: 1 }]}>
        <FlatList
          ListHeaderComponent={
            <View
              style={[
                style.flexRow,
                style.itemsCenter,
                style.justifyCenter,
                { paddingTop: 10, paddingBottom: 20 },
              ]}
            >
              <RoundedButton prependIcon="arrow-back"></RoundedButton>
              <SearchBar
                defaultValue={route.params.query}
                onSubmit={async (query) => {
                  await fetchNewQuery(query);
                }}
              ></SearchBar>
              <RoundedButton prependIcon="dots-vertical"></RoundedButton>
            </View>
          }
          stickyHeaderIndices={[0]}
          data={intersiteMangas.filter((im) => im.mangas.length > 0)}
          keyExtractor={(_, index) => `search-result-${index}`}
          renderItem={({ item }) => (
            <IntersiteMangaItem intersiteManga={item}></IntersiteMangaItem>
          )}
          ListFooterComponent={
            <>
              {!fullyLoaded && loading && (
                <ActivityIndicator></ActivityIndicator>
              )}
            </>
          }
          onEndReached={async () => {
            if (fullyLoaded) return;
            await fetchQuery();
          }}
        ></FlatList>
      </View>
    </>
  );
}
