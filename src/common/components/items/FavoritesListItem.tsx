import { Pressable, View } from "react-native";
import { FavoritesList } from "../../types/favorites/FavoritesList";
import { style } from "../../utils/style-utils";
import RoundedButton from "../buttons/RoundedButton";
import ThemedText from "../text/ThemedText";
import { DefaultValues } from "../../config/DefaultValues";
import ExpoIcon from "../icons/ExpoIcon";
import { useTheme } from "@react-navigation/native";

export default function FavoritesListItem({
  favoritesList,
  nameDisabled,
  onItemPress,
  onDotsBtnPress,
}: {
  favoritesList: FavoritesList;
  nameDisabled?: boolean;
  onItemPress?: () => void;
  onDotsBtnPress?: () => void;
}) {
  const theme = useTheme();

  return (
    <>
      <Pressable
        style={[
          style.flexRow,
          style.justifyBetween,
          style.itemsCenter,
          {
            width: "100%",
            backgroundColor: theme.colors.card,
            paddingHorizontal: 10,
            height: 70,
          },
        ]}
        onPress={() => onItemPress && onItemPress()}
      >
        <View
          style={[
            style.flexRow,
            style.itemsCenter,
            { opacity: nameDisabled ? 0.5 : 1 },
          ]}
        >
          <ExpoIcon
            name={
              favoritesList.name === DefaultValues.LIKE_FAVORITES_LIST_NAME
                ? "heart"
                : "bookshelf"
            }
            size={30}
            styleProps={[
              { color: theme.colors.text, paddingLeft: 10, paddingRight: 20 },
            ]}
          ></ExpoIcon>
          <ThemedText style={[{ fontSize: 17, fontWeight: "500" }]}>
            {favoritesList.name}
          </ThemedText>
        </View>
        <View>
          <RoundedButton
            prependIcon="dots-vertical"
            prependIconStyle={[{ fontSize: 25 }]}
            onPress={() => onDotsBtnPress && onDotsBtnPress()}
          ></RoundedButton>
        </View>
      </Pressable>
    </>
  );
}
