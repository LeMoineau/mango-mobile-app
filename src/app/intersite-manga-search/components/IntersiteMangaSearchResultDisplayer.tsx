import { FlashList } from "@shopify/flash-list";
import { IntersiteMangaSearchSorting } from "../../../common/types/filter/IntersiteMangaSearchFilter";
import React from "react";
import { IntersiteManga } from "../../../../../shared/src/types/basics/IntersiteManga";
import IntersiteMangaItem from "../../../common/components/items/IntersiteMangaItem";
import { StoredManga } from "../../../../../shared/src/types/basics/Manga";

export default function IntersiteMangaSearchResultDisplayer({
  intersiteMangas,
  sort,
  fullyLoaded,
  header,
  footer,
  onEndReached,
}: {
  intersiteMangas: IntersiteManga[];
  sort: IntersiteMangaSearchSorting;
  fullyLoaded?: boolean;
  header?: React.ReactElement;
  footer?: React.ReactElement;
  onEndReached?: () => void;
}) {
  return (
    <>
      {sort === "Group By Manga" ? (
        <FlashList
          ListHeaderComponent={header}
          stickyHeaderIndices={header && [0]}
          data={intersiteMangas}
          keyExtractor={(_, index) => `search-result-${index}`}
          renderItem={({ item }) => (
            <IntersiteMangaItem intersiteManga={item}></IntersiteMangaItem>
          )}
          ListFooterComponent={footer}
          onEndReached={async () => {
            if (fullyLoaded) return;
            onEndReached && onEndReached();
          }}
        ></FlashList>
      ) : (
        <FlashList
          ListHeaderComponent={header}
          stickyHeaderIndices={header && [0]}
          data={intersiteMangas
            .flatMap((im) => im.mangas)
            .map((m): StoredManga => {
              const im = intersiteMangas.find((im) => im.mangas.includes(m))!;
              return {
                ...m,
                intersiteManga: {
                  formattedName: im.formattedName,
                  id: im.id,
                },
              };
            })}
          keyExtractor={(_, index) => `search-result-${index}`}
          renderItem={({ item }) => (
            <></>
            // <IntersiteMangaItem intersiteManga={item}></IntersiteMangaItem>
          )}
          ListFooterComponent={footer}
          onEndReached={async () => {
            if (fullyLoaded) return;
            onEndReached && onEndReached();
          }}
        ></FlashList>
      )}
    </>
  );
}
