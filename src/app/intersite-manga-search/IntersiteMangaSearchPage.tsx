import { ActivityIndicator, FlatList, View } from "react-native";
import {
  useNavigationType,
  useRouteType,
} from "../../common/types/navigation/NavigationTypes";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import useIntersiteMangaSearch from "./hooks/useIntersiteMangaSearch";
import IntersiteMangaItem from "../../common/components/items/IntersiteMangaItem";
import SearchBar from "../../common/components/form/SearchBar";
import RoundedButton from "../../common/components/buttons/RoundedButton";
import { style } from "../../common/utils/style-utils";
import IntersiteMangaSearchFilterModal from "./components/IntersiteMangaSearchFilterModal";
import useModals from "../../../../shared/src/hooks/use-modals";
import { FlashList } from "@shopify/flash-list";
import IntersiteMangaSearchResultDisplayer from "./components/IntersiteMangaSearchResultDisplayer";
import IntersiteMangaSearchHeader from "./components/IntersiteMangaSearchHeader";
import IntersiteMangaSearchFooter from "./components/IntersiteMangaSearchFooter";

export default function IntersiteMangaSearchPage() {
  const route: useRouteType<"IntersiteMangaSearch"> = useRoute();

  const {
    intersiteMangas,
    fullyLoaded,
    loading,
    sorting,
    fetchNewQuery,
    fetchQuery,
    changeSorting,
  } = useIntersiteMangaSearch();
  const { isVisible, show, hide } = useModals<"filter">();

  useEffect(() => {
    fetchNewQuery(route.params.query);
  }, []);

  return (
    <>
      <View style={[{ flex: 1 }]}>
        {/* <FlashList
          ListHeaderComponent={
            <IntersiteMangaSearchHeader
              defaultQuery={route.params.query}
              onSearchSubmit={async (query) => {
                await fetchNewQuery(query);
              }}
              onFilterBtnPress={() => show("filter")}
            ></IntersiteMangaSearchHeader>
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
        ></FlashList> */}
        <IntersiteMangaSearchResultDisplayer
          intersiteMangas={intersiteMangas.filter((im) => im.mangas.length > 0)}
          sort={sorting}
          fullyLoaded={fullyLoaded}
          header={
            <IntersiteMangaSearchHeader
              defaultQuery={route.params.query}
              onSearchSubmit={async (query) => {
                await fetchNewQuery(query);
              }}
              onFilterBtnPress={() => show("filter")}
            ></IntersiteMangaSearchHeader>
          }
          footer={
            <IntersiteMangaSearchFooter
              fullyLoaded={fullyLoaded}
              loading={loading}
            ></IntersiteMangaSearchFooter>
          }
          onEndReached={async () => {
            if (fullyLoaded) return;
            await fetchQuery();
          }}
        ></IntersiteMangaSearchResultDisplayer>
      </View>
      <IntersiteMangaSearchFilterModal
        visible={isVisible("filter")}
        onRequestClose={() => hide("filter")}
        onFilter={(filter) => {
          if (filter.sort) {
            changeSorting(filter.sort);
          }
        }}
      ></IntersiteMangaSearchFilterModal>
    </>
  );
}
