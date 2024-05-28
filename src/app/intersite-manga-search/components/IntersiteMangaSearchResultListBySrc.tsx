import { Pressable, View } from "react-native";
import ThemedText from "../../../common/components/text/ThemedText";
import MangaItem from "../../../common/components/items/MangaItem";
import { SourceName } from "../../../shared/src/types/primitives/Identifiers";
import { StoredManga } from "../../../shared/src/types/basics/Manga";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { style } from "../../../common/utils/style-utils";
import RoundedButton from "../../../common/components/buttons/RoundedButton";
import { useState } from "react";

export default function IntersiteMangaSearchResultListBySrc({
  src,
  mangas,
}: {
  src: SourceName;
  mangas?: StoredManga[];
}) {
  const navigator: useNavigationType = useNavigation();
  const [minimize, setMinimize] = useState(false);

  return (
    <View>
      <Pressable
        style={[
          style.flexRow,
          style.justifyBetween,
          style.itemsCenter,
          { paddingHorizontal: 10 },
        ]}
        onPress={() => setMinimize(!minimize)}
      >
        <ThemedText
          style={[
            {
              fontSize: 15,
              fontWeight: "500",
              paddingBottom: 10,
              paddingTop: 15,
            },
          ]}
        >
          {src}
        </ThemedText>
        <RoundedButton
          prependIcon={minimize ? "angle-down" : "angle-up"}
        ></RoundedButton>
      </Pressable>
      {!minimize && (
        <>
          {mangas && mangas.length > 0 ? (
            mangas.map((item, index) => (
              <MangaItem
                manga={item}
                key={`search-result-${index}`}
                onPress={() => {
                  navigator.navigate("IntersiteMangaInfo", {
                    intersiteMangaId: item.intersiteManga.id,
                    defaultSource: item.src,
                  });
                }}
              ></MangaItem>
            ))
          ) : (
            <ThemedText>No manga found from this source</ThemedText>
          )}
        </>
      )}
    </View>
  );
}
