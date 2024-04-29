import { Animated, FlatList, Pressable, View } from "react-native";
import { FavoritesList } from "../../../common/types/favorites/FavoritesList";
import ThemedText from "../../../common/components/text/ThemedText";
import { useNavigation, useTheme } from "@react-navigation/native";
import { style } from "../../../common/utils/style-utils";
import useAnimatedValue from "../../../common/hooks/use-animated-value";
import HomeFavoritesListItemMangaAvatar from "./HomeFavoritesListItemMangaAvatar";
import Gradient, {
  GradientDirection,
} from "../../../common/components/image/Gradient";
import RounedButton from "../../../common/components/buttons/RoundedButton";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";

const MANGA_AVATAR_CONTAINER_PADDING_BOTTOM = 25;
const MANGA_AVATAR_SIZE = 100;

export default function HomeFavoritesListItem({
  favList,
}: {
  favList: FavoritesList;
}) {
  const navigator: useNavigationType = useNavigation();
  const theme = useTheme();
  const { animValue, enable, setEnabled } = useAnimatedValue({
    defaultState: true,
    duration: 250,
  });

  return (
    <>
      <Animated.View
        style={[
          style.border,
          style.roundedSm,
          style.flexCol,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            marginBottom: 10,
            height: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: [
                70,
                70 + MANGA_AVATAR_SIZE + MANGA_AVATAR_CONTAINER_PADDING_BOTTOM,
              ],
            }),
          },
        ]}
      >
        <Pressable
          style={[
            style.flexRow,
            style.justifyBetween,
            style.itemsCenter,
            { height: 70, paddingLeft: 20, paddingRight: 10 },
          ]}
          onPress={() => {}}
        >
          <View>
            <ThemedText style={[{ fontWeight: "500", fontSize: 15 }]}>
              {favList.name}
            </ThemedText>
          </View>
          <View style={[style.flexRow, style.itemsCenter, {}]}>
            <RounedButton
              prependIcon={enable ? "angle-down" : "angle-up"}
              onPress={() => setEnabled(!enable)}
            ></RounedButton>
            <RounedButton
              prependIcon="dots-vertical"
              onPress={() => {
                navigator.navigate("DotsOptions", {
                  favoritesListName: favList.name,
                  canOpenListInfos: true,
                });
              }}
            ></RounedButton>
          </View>
        </Pressable>
        <Animated.View
          style={[
            {
              opacity: animValue,
              height: MANGA_AVATAR_SIZE + MANGA_AVATAR_CONTAINER_PADDING_BOTTOM,
            },
          ]}
        >
          <FlatList
            horizontal
            data={favList.intersiteMangaIds}
            contentContainerStyle={[
              {
                paddingHorizontal: 15,
                paddingBottom: MANGA_AVATAR_CONTAINER_PADDING_BOTTOM,
              },
            ]}
            ItemSeparatorComponent={() => <View style={[{ width: 15 }]}></View>}
            renderItem={({ item }) => (
              <HomeFavoritesListItemMangaAvatar
                size={MANGA_AVATAR_SIZE}
                intersiteMangaId={item}
              ></HomeFavoritesListItemMangaAvatar>
            )}
          ></FlatList>
          <Gradient
            style={[
              {
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: 20,
              },
            ]}
            direction={GradientDirection.LEFT_TO_RIGHT}
            from={theme.colors.card}
          ></Gradient>
          <Gradient
            style={[
              {
                position: "absolute",
                right: 0,
                top: 0,
                height: "100%",
                width: 20,
              },
            ]}
            direction={GradientDirection.RIGHT_TO_LEFT}
            from={theme.colors.card}
          ></Gradient>
        </Animated.View>
      </Animated.View>
    </>
  );
}
