import { Animated, FlatList, Pressable, View } from "react-native";
import { FavoritesList } from "../../../common/types/favorites/FavoritesList";
import ThemedText from "../../../common/components/text/ThemedText";
import { useNavigation, useTheme } from "@react-navigation/native";
import { style } from "../../../common/utils/style-utils";
import useAnimatedValue from "../../../common/hooks/use-animated-value";
import Gradient, {
  GradientDirection,
} from "../../../common/components/image/Gradient";
import RounedButton from "../../../common/components/buttons/RoundedButton";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import { useCacheStore } from "../../../common/store/cache.store";
import { UUID } from "../../../../../shared/src/types/primitives/Identifiers";
import IntersiteMangaAvatar from "../../../common/components/items/IntersiteMangaAvatar";

const MANGA_AVATAR_CONTAINER_PADDING_BOTTOM = 25;
const MANGA_AVATAR_SIZE = 100;

export default function HomeFavoritesListItem({
  favList,
  onIntersiteMangaUnfind,
}: {
  favList: FavoritesList;
  onIntersiteMangaUnfind?: (intersiteMangaId: UUID) => void;
}) {
  const navigator: useNavigationType = useNavigation();
  const theme = useTheme();
  const { animValue, enable, setEnabled } = useAnimatedValue({
    defaultState: true,
    duration: 250,
  });
  const { getIntersiteManga } = useCacheStore();

  return (
    <>
      <Pressable
        onPress={() => {
          navigator.navigate("FavoritesListInfos", {
            favoritesListName: favList.name,
          });
        }}
      >
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
                  70 +
                    MANGA_AVATAR_SIZE +
                    MANGA_AVATAR_CONTAINER_PADDING_BOTTOM,
                ],
              }),
            },
          ]}
        >
          <View
            style={[
              style.flexRow,
              style.justifyBetween,
              style.itemsCenter,
              { height: 70, paddingLeft: 20, paddingRight: 10 },
            ]}
          >
            <View>
              <ThemedText style={[{ fontWeight: "500", fontSize: 15 }]}>
                {favList.name}
              </ThemedText>
            </View>
            <View style={[style.flexRow, style.itemsCenter, {}]}>
              <RounedButton
                prependIcon={!enable ? "angle-down" : "angle-up"}
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
          </View>
          <Animated.View
            style={[
              {
                opacity: animValue,
                height:
                  MANGA_AVATAR_SIZE + MANGA_AVATAR_CONTAINER_PADDING_BOTTOM,
              },
            ]}
          >
            <FlatList
              horizontal
              scrollEnabled={false}
              data={favList.intersiteMangaIds}
              contentContainerStyle={[
                {
                  paddingHorizontal: 15,
                  paddingBottom: MANGA_AVATAR_CONTAINER_PADDING_BOTTOM,
                },
              ]}
              ItemSeparatorComponent={() => (
                <View style={[{ width: 15 }]}></View>
              )}
              renderItem={({ item }) => (
                <IntersiteMangaAvatar
                  size={MANGA_AVATAR_SIZE}
                  intersiteManga={getIntersiteManga(item)}
                  onIntersiteMangaUnfind={() =>
                    onIntersiteMangaUnfind && onIntersiteMangaUnfind(item)
                  }
                ></IntersiteMangaAvatar>
              )}
              ListEmptyComponent={() => (
                <View style={[style.flexRow, { width: "100%", opacity: 0.5 }]}>
                  <ThemedText>This list is empty...</ThemedText>
                </View>
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
      </Pressable>
    </>
  );
}
