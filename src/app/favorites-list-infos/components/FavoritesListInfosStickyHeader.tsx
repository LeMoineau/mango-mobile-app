import { View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import RounedButton from "../../../common/components/buttons/RoundedButton";
import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import { FavoritesListName } from "../../../common/types/favorites/FavoritesList";

export function FavoritesListInfosStickyHeader({
  favListName,
}: {
  favListName: FavoritesListName;
}) {
  const navigator: useNavigationType = useNavigation();

  return (
    <View
      style={[
        style.flexRow,
        style.justifyBetween,
        style.itemsCenter,
        {
          position: "absolute",
          top: 10,
          left: 0,
          width: "100%",
          zIndex: 15,
          paddingHorizontal: 15,
        },
      ]}
    >
      <RounedButton
        prependIcon="arrow-back"
        prependIconStyle={[{ fontSize: 23 }]}
      ></RounedButton>
      <RounedButton
        prependIcon="dots-vertical"
        prependIconStyle={[{ fontSize: 23 }]}
        onPress={() => {
          navigator.navigate("DotsOptions", {
            favoritesListName: favListName,
            goBackOnDelete: true,
            goBackOnRename: true,
          });
        }}
      ></RounedButton>
    </View>
  );
}
