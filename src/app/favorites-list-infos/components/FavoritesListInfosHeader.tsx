import { View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import Gradient from "../../../common/components/image/Gradient";
import ThemedText from "../../../common/components/text/ThemedText";
import { FavoritesListName } from "../../../common/types/favorites/FavoritesList";
import { IntersiteManga } from "../../../../../shared/src/types/IntersiteManga";
import IntersiteMangaAvatar from "../../../common/components/items/IntersiteMangaAvatar";
import IconedText from "../../../common/components/text/IconedText";

export default function FavoritesListInfosHeader({
  favListName,
  coverIntersiteMangas,
}: {
  favListName: FavoritesListName;
  coverIntersiteMangas: IntersiteManga[];
}) {
  const theme = useTheme();

  return (
    <View>
      <View
        style={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          {
            height: 250,
            width: "100%",
            backgroundColor: theme.colors.border,
          },
        ]}
      >
        <View style={[style.flexRow, {}]}>
          {coverIntersiteMangas.map((intersiteManga, index) => (
            <IntersiteMangaAvatar
              key={`favlist-infos-intersitemanga-avatar-${index}`}
              intersiteManga={intersiteManga}
              size={100}
              style={[{ marginLeft: -20, marginTop: 10 * index }]}
            ></IntersiteMangaAvatar>
          ))}
          {coverIntersiteMangas.length <= 0 && (
            <IconedText iconName="book-off" style={[{ opacity: 0.5 }]}>
              {"  No manga yet..."}
            </IconedText>
          )}
        </View>
        <Gradient
          style={[{ position: "absolute", bottom: 0, left: 0 }]}
          height={50}
          width={"100%"}
        ></Gradient>
      </View>
      <ThemedText
        style={[
          {
            fontWeight: "500",
            fontSize: 25,
            paddingHorizontal: 15,
            paddingBottom: 20,
          },
        ]}
      >
        {favListName}
      </ThemedText>
    </View>
  );
}
