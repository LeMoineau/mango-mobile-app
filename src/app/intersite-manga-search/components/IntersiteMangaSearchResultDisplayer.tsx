import { FlashList } from "@shopify/flash-list";
import { IntersiteMangaSearchSorting } from "../../../common/types/filter/IntersiteMangaSearchFilter";
import React, { useEffect, useState } from "react";
import { IntersiteManga } from "../../../../../shared/src/types/basics/IntersiteManga";
import IntersiteMangaItem from "../../../common/components/items/IntersiteMangaItem";
import { StoredManga } from "../../../../../shared/src/types/basics/Manga";
import ThemedText from "../../../common/components/text/ThemedText";
import MangaItem from "../../../common/components/items/MangaItem";
import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import { SourceName } from "../../../../../shared/src/types/primitives/Identifiers";
import { ArrayUtils } from "../../../../../shared/src/utils/array-utils";
import { ScrollView, View } from "react-native";
import IntersiteMangaSearchResultListBySrc from "./IntersiteMangaSearchResultListBySrc";

export default function IntersiteMangaSearchResultDisplayer({
  intersiteMangas,
  sort,
  header,
  footer,
  srcsAllowed,
  onEndReached,
}: {
  intersiteMangas: IntersiteManga[];
  sort: IntersiteMangaSearchSorting;
  srcsAllowed: SourceName[];
  header?: React.ReactElement;
  footer?: React.ReactElement;
  onEndReached?: () => void;
}) {
  const navigator: useNavigationType = useNavigation();
  const [mangasBySrc, setMangasBySrc] = useState<{
    [src in SourceName]?: StoredManga[];
  }>({});

  useEffect(() => {
    if (sort === "By Sources") {
      setMangasBySrc(
        ArrayUtils.groupBy(
          intersiteMangas
            .flatMap((im) => im.mangas)
            .map((m): StoredManga => {
              const im = intersiteMangas.find((im) =>
                im.mangas.find((m2) => m2.id === m.id)
              )!;
              return {
                ...m,
                intersiteManga: {
                  formattedName: im.formattedName,
                  id: im.id,
                },
              };
            }),
          (m) => m.src
        )
      );
    }
  }, [sort, intersiteMangas]);

  return (
    <>
      {sort === "Group By Manga" ? (
        <FlashList
          estimatedItemSize={100}
          ListHeaderComponent={header}
          stickyHeaderIndices={header && [0]}
          data={intersiteMangas}
          keyExtractor={(_, index) => `search-result-${index}`}
          renderItem={({ item, index }) => (
            <>
              {index === 0 && <View style={{ height: 20 }}></View>}
              <IntersiteMangaItem intersiteManga={item}></IntersiteMangaItem>
            </>
          )}
          ListFooterComponent={footer}
          onEndReached={async () => {
            onEndReached && onEndReached();
          }}
        ></FlashList>
      ) : (
        <ScrollView>
          <View style={{ height: 5 }}></View>
          {(Object.keys(mangasBySrc) as SourceName[])
            .filter((src) => srcsAllowed.includes(src))
            .map((src) => (
              <IntersiteMangaSearchResultListBySrc
                key={`search-result-list-src-${src}`}
                src={src}
                mangas={mangasBySrc[src]}
              ></IntersiteMangaSearchResultListBySrc>
            ))}
          {footer}
        </ScrollView>

        // <FlashList
        //   style={[{ flex: 0 }]}
        //   key={`search-result-list-src-${src}`}
        //   ListHeaderComponent={header}
        //   estimatedItemSize={100}
        //   stickyHeaderIndices={header && [0]}
        //   data={mangasBySrc[src as SourceName]}
        //   keyExtractor={(_, index) => `search-result-${index}`}
        //   renderItem={({ item }) => (
        //     <MangaItem
        //       manga={item}
        //       onPress={() => {
        //         navigator.navigate("IntersiteMangaInfo", {
        //           intersiteMangaId: item.intersiteManga.id,
        //           defaultSource: item.src,
        //         });
        //       }}
        //     ></MangaItem>
        //   )}
        //   ListFooterComponent={footer}
        //   onEndReached={async () => {
        //     if (fullyLoaded) return;
        //     onEndReached && onEndReached();
        //   }}
        // ></FlashList>
      )}
    </>
  );
}
