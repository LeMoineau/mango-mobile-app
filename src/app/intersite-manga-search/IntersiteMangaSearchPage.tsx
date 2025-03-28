import { View } from "react-native";
import { useRouteType } from "../../common/types/navigation/NavigationTypes";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import useIntersiteMangaSearch from "./hooks/useIntersiteMangaSearch";
import IntersiteMangaSearchFilterModal from "./components/IntersiteMangaSearchFilterModal";
import useModals from "../../shared/src/hooks/use-modals";
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
    srcsAllowed,
    fetchNewQuery,
    fetchQuery,
    filter,
  } = useIntersiteMangaSearch();
  const { isVisible, show, hide } = useModals<"filter">();

  useEffect(() => {
    fetchNewQuery(route.params.query);
  }, []);

  return (
    <>
      <View style={[{ flex: 1 }]}>
        <View>
          <IntersiteMangaSearchHeader
            defaultQuery={route.params.query}
            onSearchSubmit={async (query) => {
              await fetchNewQuery(query);
            }}
            onFilterBtnPress={() => show("filter")}
          ></IntersiteMangaSearchHeader>
        </View>
        <View style={[{ flex: 1 }]}>
          <IntersiteMangaSearchResultDisplayer
            intersiteMangas={intersiteMangas.filter(
              (im) => im.mangas.length > 0
            )}
            sort={sorting}
            srcsAllowed={srcsAllowed}
            footer={
              <IntersiteMangaSearchFooter
                fullyLoaded={fullyLoaded}
                loading={loading}
              ></IntersiteMangaSearchFooter>
            }
            onEndReached={async () => {
              if (fullyLoaded || loading) return;
              await fetchQuery();
            }}
          ></IntersiteMangaSearchResultDisplayer>
        </View>
      </View>
      <IntersiteMangaSearchFilterModal
        visible={isVisible("filter")}
        onRequestClose={() => hide("filter")}
        onFilter={filter}
      ></IntersiteMangaSearchFilterModal>
    </>
  );
}
